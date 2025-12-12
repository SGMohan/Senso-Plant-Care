import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import Svg, {
  Path,
  Line as SvgLine,
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  G,
  Text as SvgText,
  Rect,
} from "react-native-svg";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRAPH_WIDTH = SCREEN_WIDTH - 80;
const GRAPH_HEIGHT = 240;
const PADDING = { top: 20, right: 40, bottom: 30, left: 20 };

// Sample data generators
const generateDayData = (type: string) => {
  if (type === "moisture") {
    return [
      { time: "16:00", value: 15 },
      { time: "18:00", value: 15 },
      { time: "20:00", value: 85 },
      { time: "22:00", value: 82 },
      { time: "00:00", value: 78 },
      { time: "02:00", value: 65 },
      { time: "04:00", value: 55 },
      { time: "06:00", value: 75 },
      { time: "08:00", value: 72 },
    ];
  } else if (type === "temperature") {
    return [
      { time: "16:00", min: 17, max: 8 },
      { time: "20:00", min: 19, max: 10 },
      { time: "00:00", min: 15, max: 12 },
      { time: "04:00", min: 18, max: 9 },
      { time: "08:00", min: 20, max: 8 },
    ];
  } else {
    return [
      { time: "16:00", value: 15 },
      { time: "20:00", value: 38 },
      { time: "00:00", value: 22 },
      { time: "04:00", value: 12 },
      { time: "08:00", value: 45 },
    ];
  }
};

const generateWeekData = (type: string) => {
  const days = ["Mon", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  if (type === "temperature") {
    return days.map(() => ({
      min: 10 + Math.random() * 10,
      max: 10 + Math.random() * 15,
    }));
  } else if (type === "light") {
    return [
      { value: 8 },
      { value: 12 },
      { value: 6 },
      { value: 4 },
      { value: 18 },
      { value: 10 },
      { value: 8 },
    ];
  }
  return days.map(() => ({ value: 50 + Math.random() * 30 }));
};

const generateMonthData = (type: string) => {
  const dates = ["05", "10", "15", "20", "25", "01", "05"];
  if (type === "temperature") {
    return dates.map(() => ({
      min: 10 + Math.random() * 10,
      max: 10 + Math.random() * 15,
    }));
  } else if (type === "light") {
    return dates.map(() => ({ value: 0 }));
  }
  return dates.map(() => ({ value: 50 + Math.random() * 30 }));
};

// Area Chart Component - Draggable
const AreaChart = ({ data }: { data: any[] }) => {
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [dragData, setDragData] = useState<{
    value: number;
    time: string;
  } | null>(null);
  const [showCard, setShowCard] = useState(false);

  const chartWidth = GRAPH_WIDTH - PADDING.left - PADDING.right;
  const chartHeight = GRAPH_HEIGHT - PADDING.top - PADDING.bottom;
  const maxValue = 100;
  const minValue = Math.min(...data.map((d) => d.value));
  const maxDataValue = Math.max(...data.map((d) => d.value));

  const getX = (index: number) => {
    return PADDING.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (value: number) => {
    return PADDING.top + chartHeight - (value / maxValue) * chartHeight;
  };

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const updateDragData = (x: number) => {
    // Constrain x to graph area only
    const constrainedX = Math.max(
      PADDING.left,
      Math.min(GRAPH_WIDTH - PADDING.right, x)
    );
    const relativeX = constrainedX - PADDING.left;
    const progress = Math.max(0, Math.min(1, relativeX / chartWidth));
    const dataIndex = Math.round(progress * (data.length - 1));
    const selectedData = data[dataIndex];

    if (selectedData) {
      const y = getY(selectedData.value);
      translateX.value = withSpring(constrainedX, {
        damping: 20,
        stiffness: 200,
      });
      translateY.value = withSpring(y - PADDING.top);
      setDragPosition({ x: constrainedX, y });
      setDragData({ value: selectedData.value, time: selectedData.time });
      setShowCard(true);
    }
  };

  const onGestureEvent = (event: any) => {
    const x = event.nativeEvent.x;
    runOnJS(updateDragData)(x);
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.BEGAN) {
      opacity.value = withSpring(1, { damping: 15, stiffness: 150 });
    } else if (event.nativeEvent.state === State.END) {
      opacity.value = withSpring(0, { damping: 15, stiffness: 150 });
      setTimeout(() => {
        runOnJS(() => {
          setDragPosition(null);
          setDragData(null);
          setShowCard(false);
        })();
      }, 1500);
    }
  };

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value - PADDING.left }],
    };
  });

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value - PADDING.left - 4 },
        { translateY: translateY.value - 4 },
      ],
    };
  });

  // Build smooth curve path
  let pathD = `M ${getX(0)} ${getY(data[0].value)}`;
  for (let i = 1; i < data.length; i++) {
    const prevX = getX(i - 1);
    const prevY = getY(data[i - 1].value);
    const currX = getX(i);
    const currY = getY(data[i].value);
    const cpX1 = prevX + (currX - prevX) / 3;
    const cpY1 = prevY;
    const cpX2 = currX - (currX - prevX) / 3;
    const cpY2 = currY;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${currX} ${currY}`;
  }

  const fillPath = `${pathD} L ${getX(data.length - 1)} ${
    GRAPH_HEIGHT - PADDING.bottom
  } L ${getX(0)} ${GRAPH_HEIGHT - PADDING.bottom} Z`;

  return (
    <View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View>
          <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
            <Defs>
              <SvgLinearGradient
                id="moistureAreaGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <Stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <Stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
              </SvgLinearGradient>
              <SvgLinearGradient
                id="moistureLineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <Stop offset="0%" stopColor="#3b82f6" />
                <Stop offset="100%" stopColor="#22c55e" />
              </SvgLinearGradient>
            </Defs>

            {/* Light dotted lines for min and max */}
            <SvgLine
              x1={PADDING.left}
              y1={getY(minValue)}
              x2={GRAPH_WIDTH - PADDING.right}
              y2={getY(minValue)}
              stroke="#F3F4F6"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            <SvgLine
              x1={PADDING.left}
              y1={getY(maxDataValue)}
              x2={GRAPH_WIDTH - PADDING.right}
              y2={getY(maxDataValue)}
              stroke="#F3F4F6"
              strokeWidth="1"
              strokeDasharray="4,4"
            />

            {/* Area fill */}
            <Path d={fillPath} fill="url(#moistureAreaGradient)" />

            {/* Line */}
            <Path
              d={pathD}
              stroke="url(#moistureLineGradient)"
              strokeWidth="3"
              fill="none"
            />

            {/* Y-axis labels (right side) */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <SvgText
                key={tick}
                x={GRAPH_WIDTH - PADDING.right + 10}
                y={getY(tick) + 4}
                fontSize="9"
                fill="#9CA3AF"
              >
                {tick}%
              </SvgText>
            ))}

            {/* X-axis labels */}
            {data
              .filter((_, i) => i % 2 === 0)
              .map((item, i) => {
                const actualIndex = i * 2;
                return (
                  <SvgText
                    key={actualIndex}
                    x={getX(actualIndex)}
                    y={GRAPH_HEIGHT - 10}
                    fontSize="9"
                    fill="#9CA3AF"
                    textAnchor="middle"
                  >
                    {item.time}
                  </SvgText>
                );
              })}
          </Svg>

          {/* Animated drag indicator line with gradient */}
          <Animated.View
            style={[
              {
                position: "absolute",
                left: PADDING.left,
                top: PADDING.top,
                width: 1,
                height: GRAPH_HEIGHT - PADDING.top - PADDING.bottom,
              },
              animatedLineStyle,
            ]}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
              }}
            />
          </Animated.View>

          {/* Animated white dot */}
          <Animated.View
            style={[
              {
                position: "absolute",
                left: PADDING.left,
                top: PADDING.top,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 5,
              },
              animatedDotStyle,
            ]}
          />
        </Animated.View>
      </PanGestureHandler>

      {/* Drag Info Card */}
      {showCard && dragPosition && dragData && (
        <View
          style={[
            styles.dragCard,
            { top: dragPosition.y - 50, left: dragPosition.x - 40 },
          ]}
        >
          <Text style={styles.dragValue}>{dragData.value}%</Text>
          <Text style={styles.dragDate}>09 Dec 2025, 14:30</Text>
        </View>
      )}
    </View>
  );
};

// Bar Chart Component (for temperature)
const BarChart = ({ data, period }: { data: any[]; period: string }) => {
  const chartWidth = GRAPH_WIDTH - PADDING.left - PADDING.right;
  const chartHeight = GRAPH_HEIGHT - PADDING.top - PADDING.bottom;
  const maxValue = 40;
  const barWidth = chartWidth / data.length - 10;

  const getY = (value: number) => {
    return PADDING.top + chartHeight - (value / maxValue) * chartHeight;
  };

  const getBarHeight = (value: number) => {
    return (value / maxValue) * chartHeight;
  };

  return (
    <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
      {/* Grid lines */}
      {[0, 10, 20, 30, 40].map((tick) => (
        <SvgLine
          key={tick}
          x1={PADDING.left}
          y1={getY(tick)}
          x2={GRAPH_WIDTH - PADDING.right}
          y2={getY(tick)}
          stroke="#F3F4F6"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
      ))}

      {/* Bars */}
      {data.map((item, index) => {
        const x = PADDING.left + (index * chartWidth) / data.length + 5;
        const minHeight = getBarHeight(item.min);
        const maxHeight = getBarHeight(item.max);

        return (
          <G key={index}>
            {/* Min bar (blue) */}
            <Rect
              x={x}
              y={getY(item.min)}
              width={barWidth}
              height={minHeight}
              fill="#60A5FA"
              rx="4"
              ry="4"
            />
            {/* Max bar (red) on top */}
            <Rect
              x={x}
              y={getY(item.min + item.max)}
              width={barWidth}
              height={maxHeight}
              fill="#EF4444"
              rx="4"
              ry="4"
            />
          </G>
        );
      })}

      {/* Y-axis labels (right side) */}
      {[0, 10, 20, 30, 40].map((tick) => (
        <SvgText
          key={tick}
          x={GRAPH_WIDTH - PADDING.right + 10}
          y={getY(tick) + 4}
          fontSize="11"
          fill="#9CA3AF"
        >
          {tick}°C
        </SvgText>
      ))}

      {/* X-axis labels */}
      {data.map((item, index) => {
        const x =
          PADDING.left + (index * chartWidth) / data.length + barWidth / 2 + 5;
        const label = item.time || item.day || item.date;
        return (
          <SvgText
            key={index}
            x={x}
            y={GRAPH_HEIGHT - 10}
            fontSize="11"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            {label}
          </SvgText>
        );
      })}
    </Svg>
  );
};

// Line Chart Component (for light)
const LineChart = ({ data, period }: { data: any[]; period: string }) => {
  const chartWidth = GRAPH_WIDTH - PADDING.left - PADDING.right;
  const chartHeight = GRAPH_HEIGHT - PADDING.top - PADDING.bottom;
  const maxValue = period === "Month" ? 20 : 50;

  const getX = (index: number) => {
    return PADDING.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (value: number) => {
    return PADDING.top + chartHeight - (value / maxValue) * chartHeight;
  };

  // Build path
  let pathD = `M ${getX(0)} ${getY(data[0].value)}`;
  for (let i = 1; i < data.length; i++) {
    pathD += ` L ${getX(i)} ${getY(data[i].value)}`;
  }

  return (
    <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
      <Defs>
        <SvgLinearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FBBF24" />
          <Stop offset="50%" stopColor="#22C55E" />
          <Stop offset="100%" stopColor="#60A5FA" />
        </SvgLinearGradient>
      </Defs>

      {/* Grid lines */}
      {[0, 10, 20, 30, 40, 50].map((tick) => {
        if (tick > maxValue) return null;
        return (
          <SvgLine
            key={tick}
            x1={PADDING.left}
            y1={getY(tick)}
            x2={GRAPH_WIDTH - PADDING.right}
            y2={getY(tick)}
            stroke="#F3F4F6"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
        );
      })}

      {/* Line */}
      <Path
        d={pathD}
        stroke="url(#lineGradient)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Dots */}
      {data.map((item, index) => (
        <G key={index}>
          <Circle
            cx={getX(index)}
            cy={getY(item.value)}
            r="4"
            fill="#fff"
            stroke="#22C55E"
            strokeWidth="2"
          />
        </G>
      ))}

      {/* Y-axis labels (right side) */}
      {[0, 10, 20, 30, 40, 50].map((tick) => {
        if (tick > maxValue) return null;
        return (
          <SvgText
            key={tick}
            x={GRAPH_WIDTH - PADDING.right + 10}
            y={getY(tick) + 4}
            fontSize="11"
            fill="#9CA3AF"
          >
            {tick}
          </SvgText>
        );
      })}

      {/* X-axis labels */}
      {data.map((item, index) => {
        const label = item.time || item.day || item.date;
        return (
          <SvgText
            key={index}
            x={getX(index)}
            y={GRAPH_HEIGHT - 10}
            fontSize="11"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            {label}
          </SvgText>
        );
      })}
    </Svg>
  );
};

// Simple Graph Component (for embedding in other screens)
const SimpleGraph = () => {
  const data = generateDayData("moisture");
  return <AreaChart data={data} />;
};

// Main Graphs Section Component
const RealTimeGraph = () => {
  const [selectedMetric, setSelectedMetric] = useState("moisture");
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Type guard for data points that carry a single numeric value
  const hasValue = (point: any): point is { value: number } =>
    typeof point?.value === "number";

  const metrics = [
    {
      id: "moisture",
      label: "Soil Moisture",
      icon: "water",
      iconType: "ionicon",
      color: "#3b82f6",
    },
    {
      id: "temperature",
      label: "Temperature",
      icon: "thermometer",
      iconType: "ionicon",
      color: "#ef4444",
    },
    {
      id: "light",
      label: "Light",
      icon: "sunny",
      iconType: "ionicon",
      color: "#eab308",
    },
  ];

  const currentMetric = metrics.find((m) => m.id === selectedMetric);

  const getData = () => {
    if (selectedPeriod === "Day") return generateDayData(selectedMetric);
    if (selectedPeriod === "Week") return generateWeekData(selectedMetric);
    return generateMonthData(selectedMetric);
  };

  const data = getData();
  const currentDate = "09 Dec 2025";

  const getMetricStats = () => {
    if (selectedMetric === "moisture") {
      const latestValue = [...data].reverse().find(hasValue)?.value ?? 18;
      return {
        title: "Volumetric Water Content",
        range: "13-64%",
        current: latestValue,
        unit: "%",
        lastWatering: "09.12.25",
        nextWatering: "15.12.25",
      };
    } else if (selectedMetric === "temperature") {
      return {
        title: "Ambient",
        range: "17-34°C",
        current: 20,
        unit: "°C",
        tempDiff: "17.4",
        median: "20.4",
      };
    } else {
      return {
        title: "Amount (DLI)",
        range: "1.9 mol",
        current: selectedPeriod === "Day" ? 18 : 0.2,
        unit: selectedPeriod === "Day" ? "μmol/m²s" : "mol",
        trend: "2.2",
        avgHours: "8.4",
      };
    }
  };

  const stats = getMetricStats();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Graphs</Text>

        {/* Dropdown Selector */}
        <View>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <View style={styles.dropdownIconContainer}>
              <Ionicons
                name={currentMetric?.icon as any}
                size={16}
                color={currentMetric?.color}
              />
            </View>
            <Ionicons name="chevron-down" size={12} color="#6B7280" />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownMenu}>
              {metrics.map((metric) => (
                <TouchableOpacity
                  key={metric.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedMetric(metric.id);
                    setDropdownOpen(false);
                  }}
                >
                  <View style={styles.dropdownItemIconContainer}>
                    <Ionicons
                      name={metric.icon as any}
                      size={16}
                      color={metric.color}
                    />
                  </View>
                  <Text style={styles.dropdownItemText}>{metric.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        {["Day", "Week", "Month"].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Graph Card */}
      <View style={styles.graphCard}>
        {/* Stats Header */}
        <View style={styles.statsHeader}>
          <View style={styles.statsLeft}>
            <View style={styles.titleRow}>
              <Text style={styles.statsTitle}>
                {stats.title}{" "}
                {selectedMetric === "light" && selectedPeriod === "Day"
                  ? ":"
                  : ""}
              </Text>
              {selectedMetric === "moisture" && (
                <View style={styles.dateBadge}>
                  <Text style={styles.dateBadgeText}>{currentDate}</Text>
                </View>
              )}
            </View>
            <Text style={styles.statsRange}>{stats.range}</Text>
            <Text style={styles.statsLabel}>
              {selectedMetric === "light" && selectedPeriod === "Day"
                ? "Received Today"
                : "Range"}
            </Text>
          </View>
          <View style={styles.statsRight}>
            <View style={styles.currentValueBox}>
              <Text style={styles.currentValue}>
                {stats.current.toFixed(
                  selectedPeriod === "Week" && selectedMetric === "light"
                    ? 1
                    : 0
                )}
                <Text style={styles.currentUnit}> {stats.unit}</Text>
              </Text>
            </View>
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>{currentDate}</Text>
            </View>
            <Text style={styles.dateSubtext}>
              {currentDate}, {selectedPeriod === "Day" ? "00:00" : "22:00"}
            </Text>
          </View>
        </View>

        {/* Graph */}
        <View style={styles.graphContainer}>
          {selectedMetric === "moisture" ? (
            <AreaChart data={data} />
          ) : selectedMetric === "temperature" ? (
            <BarChart data={data} period={selectedPeriod} />
          ) : (
            <LineChart data={data} period={selectedPeriod} />
          )}
        </View>
      </View>

      {/* Bottom Stats Cards */}
      <View style={styles.bottomStats}>
        {selectedMetric === "moisture" ? (
          <>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Last watering :</Text>
              <Text style={styles.statValue}>{stats.lastWatering}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Next watering :</Text>
              <Text style={styles.statValue}>{stats.nextWatering}</Text>
            </View>
          </>
        ) : selectedMetric === "temperature" ? (
          <>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Temp Difference :</Text>
              <Text style={styles.statValue}>{stats.tempDiff} °C</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Median :</Text>
              <Text style={styles.statValue}>{stats.median} °C</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Trend :</Text>
              <Text style={styles.statValue}>
                {stats.trend} <Text style={styles.trendDown}>% down</Text>
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Avg. hours of light :</Text>
              <Text style={styles.statValue}>
                {stats.avgHours} <Text style={styles.statUnit}>mins</Text>
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F3F4F6",
  },
  dropdownIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    minWidth: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  dropdownItemIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownItemText: {
    fontSize: 13,
    color: "#374151",
  },
  periodContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#E8F5EF",
    borderRadius: 25,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  periodButtonActive: {
    backgroundColor: "#4AA88B",
  },
  periodText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  periodTextActive: {
    color: "#fff",
  },
  graphCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  statsLeft: {},
  statsTitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  statsRange: {
    fontSize: 13,
    color: "#000",
    marginBottom: 2,
  },
  statsLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  statsRight: {
    alignItems: "flex-end",
  },
  currentValueBox: {
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2C593A",
  },
  currentUnit: {
    fontSize: 16,
  },
  dateBox: {
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#93C5FD",
  },
  dateText: {
    fontSize: 11,
    color: "#1E40AF",
  },
  dateSubtext: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },
  graphContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  bottomStats: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  statUnit: {
    fontSize: 14,
  },
  trendDown: {
    fontSize: 12,
    color: "#EF4444",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateBadge: {
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  dateBadgeText: {
    fontSize: 10,
    color: "#3E5842",
    fontWeight: "500",
  },
  dragCard: {
    position: "absolute",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "flex-start",
    zIndex: 1000,
    minWidth: 80,
  },
  dragValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 2,
  },
  dragDate: {
    fontSize: 9,
    color: "#9CA3AF",
  },
});

export default RealTimeGraph;
export { SimpleGraph };

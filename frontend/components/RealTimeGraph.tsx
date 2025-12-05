import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Circle,
  Line,
} from "react-native-svg";

interface RealTimeGraphProps {
  isHealthStatus?: boolean;
  useWaveOnly?: boolean;
  // TODO: Backend Integration - Add props for real-time data
  // sensorData?: SensorData;
  // timePeriod?: 'day' | 'week' | 'month';
  // plantId?: string;
}

const RealTimeGraph: React.FC<RealTimeGraphProps> = ({ 
  isHealthStatus = false, 
  useWaveOnly = false 
  // TODO: Backend Integration - Destructure real-time data props
  // sensorData,
  // timePeriod = 'day',
  // plantId
}) => {
  const phaseRef = React.useRef(0);
  const [, setTick] = React.useState(0);
  const { width } = Dimensions.get("window");
  
  // TODO: Backend Integration - Add state for historical data
  // const [graphData, setGraphData] = React.useState<GraphData | null>(null);
  // const [loading, setLoading] = React.useState(false);

  const graphWidth = isHealthStatus ? 180 : width - 80;
  const graphHeight = isHealthStatus ? 60 : 60;

  React.useEffect(() => {
    const id = setInterval(() => {
      phaseRef.current += 0.15;
      setTick((t: number) => t + 1);
    }, 40);
    return () => clearInterval(id);
  }, []);
  
  // TODO: Backend Integration - Fetch historical graph data
  // React.useEffect(() => {
  //   const fetchGraphData = async () => {
  //     if (!plantId || !timePeriod) return;
  //     try {
  //       setLoading(true);
  //       const data = await PlantAPI.getGraphData(plantId, timePeriod);
  //       setGraphData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch graph data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchGraphData();
  // }, [plantId, timePeriod]);

  const getWaveY = (x: number) => {
    const phase = phaseRef.current;
    const progress = x / graphWidth;
    
    // TODO: Backend Integration - Use real sensor data for wave generation
    // if (sensorData && graphData) {
    //   const dataPoint = interpolateDataPoint(progress, graphData.data);
    //   return mapSensorValueToY(dataPoint.soilMoisture, graphHeight);
    // }
    
    const startY = graphHeight * 0.85;
    const endY = graphHeight * 0.25;
    const baseLine = startY - progress * (startY - endY);
    const amplitude = graphHeight * 0.25;
    const frequency = 4;
    return baseLine + Math.sin(progress * Math.PI * frequency + phase) * amplitude;
  };

  const buildLinePath = () => {
    let d = `M 0 ${getWaveY(0)}`;
    for (let x = 1; x <= graphWidth; x += 3) {
      d += ` L ${x} ${getWaveY(x)}`;
    }
    return d;
  };

  const linePath = buildLinePath();
  const fillPath = linePath + ` L ${graphWidth} ${graphHeight} L 0 ${graphHeight} Z`;
  const indicatorX = isHealthStatus ? graphWidth - 10 : graphWidth * 0.78;
  const indicatorY = getWaveY(indicatorX);

  return (
    <View style={isHealthStatus ? styles.healthWaveContainer : styles.realTimeGraphContainer}>
      <Svg width={graphWidth} height={graphHeight}>
        <Defs>
          <SvgLinearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#4AA88B" stopOpacity={0.35} />
            <Stop offset="1" stopColor="#4AA88B" stopOpacity={0} />
          </SvgLinearGradient>
          <SvgLinearGradient id="waveLine" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#2F7A55" />
            <Stop offset="1" stopColor="#4AA88B" />
          </SvgLinearGradient>
        </Defs>
        <Path d={fillPath} fill="url(#waveFill)" />
        <Path
          d={linePath}
          stroke="url(#waveLine)"
          strokeWidth={isHealthStatus ? 1.6 : 2.6}
          fill="none"
          strokeLinecap="round"
        />
        <Line
          x1={indicatorX}
          y1={indicatorY}
          x2={indicatorX}
          y2={graphHeight}
          stroke="#4AA88B"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        {isHealthStatus ? (
          <>
            <Circle cx={indicatorX} cy={indicatorY} r={5.5} fill="#E8F5EF" />
            <Circle cx={indicatorX} cy={indicatorY} r={3} fill="#4AA88B" />
          </>
        ) : (
          <>
            <Circle cx={indicatorX} cy={indicatorY} r={8} fill="#E8F5EF" />
            <Circle cx={indicatorX} cy={indicatorY} r={5} fill="#4AA88B" />
          </>
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  healthWaveContainer: {
    width: 180,
    height: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  realTimeGraphContainer: {
    height: 70,
    borderRadius: 12,
    paddingHorizontal: 0,
    paddingTop: 15,
    paddingBottom: 8,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RealTimeGraph;
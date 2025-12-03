import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    time: string;
    image: any;
  };
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskImageContainer}>
        <Image 
          source={task.image} 
          style={styles.taskImage}
          resizeMode="cover"
          fadeDuration={0}
        />
      </View>
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskTime}>{task.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    minWidth: 140,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskImageContainer: {
    backgroundColor: "#EFF3EA",
    borderRadius: 10,
    marginRight: 12,
    width: 60,
    height: 60,
    overflow: "hidden",
  },
  taskImage: {
    width: "100%",
    height: "100%",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a3c2a",
    fontFamily: "Roboto",
  },
  taskTime: {
    fontSize: 12,
    color: "#6b8a7a",
    marginTop: 4,
    fontFamily: "Roboto",
  },
});
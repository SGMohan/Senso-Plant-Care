// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// interface TaskCardProps {
//   task: {
//     id: number;
//     title: string;
//     time: string;
//     image: any;
//   };
// }

// export default function TaskCard({ task }: TaskCardProps) {
//   const router = useRouter();
  
//   // Parse title to extract action and plant name
//   // Format: "Water Monstera" -> action: "Water", plantName: "Monstera"
//   const titleParts = task.title.split(" ");
//   const action = titleParts[0]; // First word (e.g., "Water")
//   const plantName = titleParts.slice(1).join(" "); // Rest of the words (e.g., "Monstera")

//   const handleTaskPress = () => {
//     router.push("/addtasks");
//   };

//   return (
//     <TouchableOpacity style={styles.taskCard} onPress={handleTaskPress} activeOpacity={0.7}>
//       <View style={styles.taskImageContainer}>
//         <Image
//           source={task.image}
//           style={styles.taskImage}
//           resizeMode="cover"
//           fadeDuration={0}
//         />
//       </View>
//       <View style={styles.taskContent}>
//         <Text style={styles.taskTitle}>{action}</Text>
//         <Text style={styles.taskPlantName}>{plantName}</Text>
//         <Text style={styles.taskTime}>{task.time}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   taskCard: {
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 16,
//     marginRight: 12,
//     minWidth: 140,
//     flexDirection: "row",
//     alignItems: "center",
//     boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
//     elevation: 2,
//   },
//   taskImageContainer: {
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     marginRight: 12,
//     width: 54,
//     height: 54,
//     overflow: "hidden",
//   },
//   taskImage: {
//     width: "100%",
//     height: "100%",
//   },
//   taskContent: {
//     flex: 1,
//   },
//   taskTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1a3c2a",
//     fontFamily: "Inter",
//   },
//   taskPlantName: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#1a3c2a",
//     fontFamily: "Inter",
//     marginTop: 1.5,
//   },
//   taskTime: {
//     fontSize: 12,
//     fontWeight: "400",
//     color: "#7D7B7B",
//     marginTop: 6,
//     fontFamily: "Inter",
//   },
// });

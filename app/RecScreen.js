import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// TODO - replace 'localhost' by doing the following
// 1. cd to Good-Night/app/
// 2. run expo start
// 3. find the ip address directly below the QR code
// 4. replace 'localhost' with everything between
//    'exp://' and ':' from the ip below the QR code

const ip = "http://localhost:5000/"

const RecItem = ({ content }) => {
  return (
    <LinearGradient 
      style={styles.recItemContainer}
      colors= {['#C57DFF', '#E1BAFF']}
      >
      <Text>{ content }</Text>
    </LinearGradient>
  );
}

const CategoryList = ({ title, recList }) => {
  return (
    // <View style={styles.categoryListStyle}>
    <LinearGradient 
    colors={['#9614FF', '#C57DFF']}
    style={[styles.categoryListStyle]}>
      <Text style={{textAlign: 'center', color: "white", fontWeight: "900"}}> {title} </Text>
      <FlatList 
      data={recList}
      renderItem={({ item }) => <RecItem content={item} />}
      contentContainerStyle={styles.categoryList}
      style={{ width: "100%" }}
      // ListHeaderComponent={() => (
      //   <Text style={styles.categoryHeader}>
      //     {title}
      //   </Text>
      // )}
    />
    </LinearGradient>
    // </View>
    
  );  
}

const SleepRecList = () => {
  const [sleepRecs, setSleepRecs] = useState(null)

  useEffect(() => {
    const fetchSleepRecs = async () => {
      const response = await fetch(ip + "/api/sleep-rec-list");
      const data = await response.json();
      setSleepRecs(data["sleepRecList"])
    }
    
    fetchSleepRecs();
  }, []);
  
  return (
    <CategoryList title="Sleep" recList={sleepRecs}/>
  );
}

const DietRecList = () => {
  const [dietRecs, setDietRecs] = useState(null)

  useEffect(() => {
    const fetchDietRecs = async () => {
      const response = await fetch(ip + "/api/diet-rec-list");
      const data = await response.json();
      setDietRecs(data["dietRecList"])
    }
    
    fetchDietRecs();
  }, []);
  
  return (
    <CategoryList title="Diet" recList={dietRecs}/>
  );
}

const ExerciseRecList = () => {
  const [exerciseRecs, setExerciseRecs] = useState(null)

  useEffect(() => {
    const fetchExerciseRecs = async () => {
      const response = await fetch(ip + "/api/exercise-rec-list");
      const data = await response.json();
      setExerciseRecs(data["exerciseRecList"])
    }
    
    fetchExerciseRecs();
  }, []);
  
  return (
    <CategoryList title="Exercise" recList={exerciseRecs}/>
  );
}


const RecScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.date_container}>
        Recommendations
      </Text>
      <SleepRecList />
      <DietRecList />
      <ExerciseRecList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontWeight: "900",
    fontSize: 30,
    marginTop: 50
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: "15%",
    flexDirection: "column",
  },
  date_container: {
    flex: 0,
    textAlign: "left",
    alignSelf: "stretch",
    paddingLeft: "7%",
    // backgroundColor: "skyblue", //used this to see the view
    paddingBottom: "10%",
    fontWeight: "900",
    fontSize: 30,
  },
  categoryList: {
    flexGrow: 1,
    marginTop: 10
  },
  categoryHeader: {
    alignSelf: "center",
    fontWeight: "900",
    fontSize: 20
  },
  recItemContainer: {
    alignSelf: "stretch",
    backgroundColor: "#c4c4c4",
    borderRadius: 10,
    margin: 5,
    padding: 5
  },
  categoryListStyle: {
  flex: 1,
  backgroundColor: "white", 
  flexDirection: "column", 
  justifyContent: "center", 
  width: "100%", 
  borderRadius: "20%",
  backgroundColor: "#FF9D00",
  paddingBottom: "2%",
}
});

export { RecScreen };

// const CategoryList = ({ title, recList }) => {
//   return (
//     // <View style={styles.categoryListStyle}>
//     <LinearGradient 
//     colors={['#FFB000', '#FFDD94']}
//     style={[styles.categoryListStyle]}>
//       <Text style={{textAlign: 'center'}}> {title} </Text>
//       <FlatList 
//       data={recList}
//       renderItem={({ item }) => <RecItem content={item} />}
//       contentContainerStyle={styles.categoryList}
//       style={{ width: "100%" }}
//       // ListHeaderComponent={() => (
//       //   <Text style={styles.categoryHeader}>
//       //     {title}
//       //   </Text>
//       // )}
//     />
//     </LinearGradient>
//     // </View>
    
//   );  
// }
// categoryListStyle: {
//   flex: 1,
//   backgroundColor: "white", 
//   flexDirection: "column", 
//   justifyContent: "center", 
//   width: "100%", 
//   borderRadius: "20%",
//   backgroundColor: "#FF9D00",
// }
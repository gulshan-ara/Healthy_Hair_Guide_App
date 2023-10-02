// import necessary libraries
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView 
} from 'react-native';

// a custom component for showing the cards
/** Here I'm using react navigation where I'm passing data as params, and rendering
 * one page with three different datasets based on user selection. Which data to show
 * is decided when user presses a card. the screen name is passed as a prop here.
  */
const Card = ({
  title_one,
  title_two,
  subtitle,
  top_pos,
  left_pos,
  screen,
}) => {
  const navigation = useNavigation();
  return (
    /** The key part of this card design is, I wrote the card title over an image
     * and slightly rotated the text so that it matches the image design.
     * I struggled to place the title smoothly, so I splitted it in two parts, 
     * title_one and title_two. And set the top & left position of both part 
     * according to the image.
     */
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('HairHacksList', screen)}>
      <ImageBackground
        source={require('../assets/back1.jpeg')}
        resizeMode="cover"
        imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{title_one}</Text>
          <Text style={[styles.titleText, { top: top_pos, left: left_pos }]}>
            {title_two}
          </Text>
        </View>
      </ImageBackground>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

export default function HairHacks() {
  /** The ui of this page is simple. It contains three pressable images with some texts.
   * here a custom card design is used thrice with custom title texts.
   * the screen prop decides which data to show after navigating.
   */
  return (
    <ScrollView style={styles.container}>
      <Card
        title_one="Daily"
        title_two="Definites"
        subtitle="Explore tricks for Daily care"
        top_pos={105}
        left_pos={100}
        screen="Daily"
      />
      <Card
        title_one="Washday"
        title_two="Winner"
        subtitle="Explore tricks for Washday"
        top_pos={105}
        left_pos={130}
        screen="Washday"
      />
      <Card
        title_one="Growth"
        title_two="Gamblers"
        subtitle="Explore tricks for Growth"
        top_pos={105}
        left_pos={100}
        screen="Growth"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    height: '100%',
  },
  cardContainer: {
    height: 250,
    margin: 10,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleView: {
    height: 200,
    marginBottom: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 2,
    position: 'absolute',
    transform: [{ rotate: '-10deg' }],
    top: 80,
    left: 115,
    color: 'black',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    margin: 10,
    color: 'blueviolet',
    textAlign: 'center',
  },
});

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { exploreData } from '../staticData/ExploreData';

/** Here I'm creating a card component, which can show some texts with 
 * a 'read more/ read less' button. This means this card can be expanded
 * on user's choice. So here, I took heading text and main content as props. 
 * Rest i used a state to handle the card expansion and ui designing of the card
 */
const CardView = ({ heading, content }) => {
  // state to handle card expansion
  const [readMore, setReadMore] = useState(false);

  // function to handle the change of readMore state
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  // two variables for deciding which text to show on card
  const cardText = readMore ? content : `${content.slice(0, 200)}`;
  const readLink = readMore ? 'Read Less' : 'Read More';

  // ui design of the card
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardHeading}>{heading}</Text>
      <Text style={styles.cardContent}>{cardText}</Text>
      <TouchableOpacity onPress={toggleReadMore}>
        <Text style={styles.readBtn}>{readLink}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ExploreScreen = () => {
  // state to handle search feature 
  const [searchText, setSearchText] = useState('');

  // function to show contents according to search only.
  const searchedData = exploreData.filter((item) => {
    /** Here first all items of a tag is joined together and turned into a big string. 
     * Next I looked for the searched keyword pattern in the tag string. 
     * if there's a match, I returned that data as searchedData to show. 
     */
    const tags = item.tags.join(' ').toLowerCase();
    return tags.includes(searchText.toLowerCase());
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchBarText}>
          Explore the most effective DIY hair mask for your hair concern.
        </Text>
        <SearchBar value={searchText} setValue={setSearchText} />
      </View>
      {/* Here if user searches for anything, then only items related to that search
      will be shown. If no data exists, then a sorry text will be shown. */}
      {searchedData.length > 0 ? (
        searchedData.map((item) => (
          <CardView
            key={item.heading}
            heading={item.heading}
            content={item.content}
          />
        ))
      ) : (
        <Text style={styles.noResults}>Sorry, no results found😢</Text>
      )}
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'plum',
    flex: 1,
    height: '100%',
  },
  searchBarContainer: {
    marginHorizontal: 10,
  },
  searchBarText: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginVertical: '2%',
    borderRadius: 12,
    elevation: 20,
    borderColor: 'orchid',
    borderWidth: 2,
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  cardHeading: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  cardContent: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  readBtn: {
    textAlign: 'center',
    color: 'orchid',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noResults: {
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    height: 50,
    marginHorizontal: '10%',
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 12,
  },
});

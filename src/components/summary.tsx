import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { fetchSummary } from '../api/spews';

type SummaryRouteProp = RouteProp<RootStackParamList, 'Summary'>;

interface Snippet {
  url: string;
  thumbnail: string;
  snippet: string;
}

interface SummaryData {
  id: number;
  title: string;
  summary: string;
  snippets: Snippet[];
}

const Summary: React.FC = () => {
  const route = useRoute<SummaryRouteProp>();
  const { id } = route.params;
  const [data, setData] = useState<SummaryData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchSummary(id);
        setData(response.body[0]);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      }
    };

    loadData();
  }, [id]);

  const renderSnippet = ({ item }: { item: Snippet }) => (
    <TouchableOpacity
      style={styles.snippetContainer}
      onPress={() => Linking.openURL(item.url)}
    >
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : null}
      <Text style={styles.snippet}>{item.snippet}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {data ? (
        <>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.summary}>{data.summary}</Text>
          <FlatList
            data={data.snippets}
            renderItem={renderSnippet}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.snippetList}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summary: {
    fontSize: 16,
    marginBottom: 16,
  },
  snippetList: {
    marginTop: 16,
  },
  snippetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  snippet: {
    flex: 1,
    fontSize: 14,
  },
});

export default Summary;

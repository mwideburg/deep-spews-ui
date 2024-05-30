import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { fetchTrends } from '../api/spews';

type TrendsNavigationProp = NavigationProp<RootStackParamList, 'Trends'>;


interface TrendItem {
    id: string;
    trend: string;
    createdAt: string;
  }

const Trends: React.FC = () => {
  const navigation = useNavigation<TrendsNavigationProp>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchTrends();
        setData(response.body);
      } catch (error) {
        console.error('Failed to fetch trends:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderItem = ({ item }: { item: TrendItem }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Summary', { id: item.id })}
    >
      <Text style={styles.title}>{item.trend}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 16,
  },
});

export default Trends;

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { fetchJobs } from '../../../utils';

const NearbyJobs = () => {
  const router = useRouter();
  const query = useQuery(['nearby'], fetchJobs);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {query.isLoading ? (
          <ActivityIndicator size='large' />
        ) : query.isError ? (
          <Text>{`Something went wrong: ${query.error}`}</Text>
        ) : (
          query.data.map((job) => {
            return (
              <NearbyJobCard
                key={job.slug}
                job={job}
                handleNavigate={() => router.push(`/job-details/${job.slug}`)}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;

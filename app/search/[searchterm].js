import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { NearbyJobCard, ScreenHeaderBtn } from '../../components';

import styles from '../../components/home/nearby/nearbyjobs.style';
import { SIZES, COLORS, icons } from '../../constants';

const Search = () => {
  const router = useRouter();
  const { searchterm } = useSearchParams();
  const queryClient = useQueryClient();
  const [searchResult, setSearchResult] = useState(null);
  const notFound = 'Not Found';

  useEffect(() => {
    const jobs = queryClient.getQueryData(['nearby']);
    if (jobs && searchterm) {
      const lowerSearch = searchterm.toLowerCase();
      let newSearchResult = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerSearch) ||
          job.description.toLowerCase().includes(lowerSearch) ||
          job.tags.map((tag) => tag.toLowerCase()).includes(lowerSearch) ||
          job.job_types
            .map((type) => type.toLowerCase())
            .includes(lowerSearch) ||
          job.company_name.toLowerCase().includes(lowerSearch)
      );
      if (!newSearchResult.length) newSearchResult = notFound;
      setSearchResult(newSearchResult);
    }
  }, [searchterm]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: '',
        }}
      />
      {searchResult && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ gap: SIZES.medium }}>
              {searchResult === notFound ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  Nothing Found
                </Text>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      paddingLeft: 15,
                    }}
                  >
                    {searchterm}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      paddingLeft: 15,
                    }}
                  >
                    Job Opportunities:
                  </Text>

                  {searchResult.map((job) => {
                    return (
                      <NearbyJobCard
                        key={job.slug}
                        job={job}
                        handleNavigate={() =>
                          router.push(`/job-details/${job.slug}`)
                        }
                      />
                    );
                  })}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;

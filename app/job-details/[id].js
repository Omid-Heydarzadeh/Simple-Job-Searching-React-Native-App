import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  Specifics,
  ScreenHeaderBtn,
} from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import getImage from '../../components/common/cards/mapImage';

const JobDetails = () => {
  const { id: slug } = useSearchParams();
  const router = useRouter();
  const job = useQueryClient()
    .getQueryData(['nearby'])
    .find((job) => job.slug === slug);

  const tabs = ['About', 'Link', 'Tags'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {};
  const displayTabContent = () => {
    switch (activeTab) {
      case tabs[0]:
        return (
          <JobAbout
            info={job.description
              .replace(/<[^<]*?>/g, '')
              .replace(/\n\s\n/g, '')}
          />
        );
      case tabs[1]:
        return (
          <Text
            style={{ color: '#3cf', textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL(job.url)}
          >
            {job.url}
          </Text>
        );
      case tabs[2]:
        return (
          <View
            style={{
              flex: 1,
              columnGap: 5,
              rowGap: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 20,
            }}
          >
            {job.tags.map((tag) => (
              <Text
                key={tag}
                style={{
                  backgroundColor: '#3cf',
                  paddingVertical: 6,
                  paddingHorizontal: 20,
                  borderRadius: 99,
                  fontSize: 16,
                }}
              >
                {tag}
              </Text>
            ))}
          </View>
        );
    }
  };

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

      {job && (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={getImage(job.company_name)}
                jobTitle={job.title}
                companyName={job.company_name}
                location={job.location}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          </ScrollView>

          <JobFooter url={job.url} />
        </>
      )}
    </SafeAreaView>
  );
};

export default JobDetails;

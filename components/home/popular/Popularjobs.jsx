import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { SIZES, COLORS } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { fetchJobs } from "../../../utils";

const Popularjobs = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: ["popular"],
    queryFn: fetchJobs,
  });
  const [selectedJob, setSelectedJob] = React.useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {query.isLoading ? (
          <ActivityIndicator size="large" />
        ) : query.isError ? (
          <Text>{`Something went wrong: ${query.error}`}</Text>
        ) : (
          <FlatList
            data={query.data}
            renderItem={({ item }) => {
              return (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={() => {
                    router.push(`/job-details/${item.slug}`);
                    setSelectedJob(item.slug);
                  }}
                />
              );
            }}
            keyExtractor={(item) => item?.slug}
            contentContainerStyle={{
              columnGap: SIZES.medium,
              paddingVertical: 20,
            }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;

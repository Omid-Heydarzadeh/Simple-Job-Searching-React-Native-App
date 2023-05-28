import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './nearbyjobcard.style';
import getImage from '../mapImage';

const NearbyJobCard = ({ job, handleNavigate }) => {
  const {
    slug,
    company_name,
    title,
    description,
    remote,
    url,
    tags,
    job_types,
    location,
    created_at,
  } = job;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={getImage(company_name)}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {title}
        </Text>
       {tags.length > 0 && <Text style={styles.jobType} numberOfLines={1}>
          {tags.join(', ')}
        </Text>}
        {job_types.length > 0 && <Text style={styles.jobType} numberOfLines={1}>
          {job_types.join(', ')}
        </Text>}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(NearbyJobCard);

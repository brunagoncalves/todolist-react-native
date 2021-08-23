import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ItemWrapperProps {
  index: number;
  children: ReactNode;
}

export function ItemWrapper({ index, children }: ItemWrapperProps) {
  if (index % 2 === 0) {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['rgba(196, 196, 196, 0.24)', 'rgba(196, 196, 196, 0)']}
        style={styles.itemWrapper}
      >
        {children}
      </LinearGradient>
    );
  }

  return <View style={styles.itemWrapper}>{children}</View>;
}
const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    borderRadius: 5,
  },
});

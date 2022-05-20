import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import convert from 'convert-units';
import {Picker} from '@react-native-picker/picker';
import {TabBar, TabView} from 'react-native-tab-view';

import {color} from './constant/color';

const measures = convert().measures();

const MeasereView = ({measure, value, setValue}) => {
  const units = convert().possibilities(measure);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1]);
  const [valueConverted, setValueConverted] = useState('0');

  useEffect(() => {
    setValueConverted(
      convert(+value)
        .from(fromUnit)
        .to(toUnit)
        .toFixed(2),
    );
  }, [value, fromUnit, toUnit]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Picker
          style={styles.column}
          selectedValue={fromUnit}
          onValueChange={setFromUnit}
          dropdownIconColor={color.primary}>
          {units.map((unit, index) => (
            <Picker.Item
              key={index}
              label={unit}
              value={unit}
              style={{color: 'black', backgroundColor: 'white'}}
            />
          ))}
        </Picker>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.row}>
        <Picker
          style={styles.column}
          selectedValue={toUnit}
          onValueChange={setToUnit}
          dropdownIconColor={color.primary}>
          {units.map((unit, index) => (
            <Picker.Item key={index} label={unit} value={unit} />
          ))}
        </Picker>
        <View style={styles.column}>
          <Text style={[styles.input, {fontSize: 40, fontWeight: 'bold'}]}>
            {valueConverted}
          </Text>
        </View>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    measures.map(measure => ({key: measure, title: measure})),
  );
  const [value, setValue] = useState('0');

  const renderScene = ({route}) => {
    return (
      <MeasereView measure={route.key} value={value} setValue={setValue} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled
            style={{backgroundColor: color.primary}}
            indicatorStyle={{backgroundColor: color.indicator}}
            tabStyle={{width: 'auto'}}
          />
        )}></TabView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    textTransform: 'uppercase',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    marginHorizontal: 20,
  },
  input: {
    height: 60,
    fontSize: 30,
    borderColor: color.primary,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
});

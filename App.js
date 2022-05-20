import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import convert from 'convert-units';
import {Picker} from '@react-native-picker/picker';

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
              style={{color: 'black', backgroundColor: 'white', fontSize: 22}}
            />
          ))}
        </Picker>
        <View style={styles.column}>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={styles.input}
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
            <Picker.Item
              key={index}
              label={unit}
              value={unit}
              style={{color: 'black', backgroundColor: 'white', fontSize: 22}}
            />
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

const unCamelCase = str => str.replace(/([A-Z])/g, ' $1');

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    measures.map(measure => ({key: measure, title: unCamelCase(measure)})),
  );
  const [value, setValue] = useState('0');

  const renderScene = ({route}) => (
    <MeasereView measure={route.key} value={value} setValue={setValue} />
  );

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
            tabStyle={{width: 'auto'}}
            indicatorStyle={{backgroundColor: color.indicator}}
            style={{backgroundColor: color.primary}}
          />
        )}></TabView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.primary,
    textAlign: 'center',
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
    color: '#353935',
    height: 60,
    borderColor: color.primary,
    borderBottomWidth: 1,
    fontSize: 30,
    textAlign: 'center',
  },
});

// screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
    const [interval, setInterval] = useState('');

    const saveInterval = async () => {
        // Save the interval to AsyncStorage
        await AsyncStorage.setItem('interval', interval);

        // Navigate back to the main screen
        navigation.goBack();
    };

    return (
        <View>
            <Text>Settings Screen</Text>
            <TextInput
                value={interval}
                onChangeText={setInterval}
                placeholder="Interval in minutes"
                keyboardType="numeric"
            />
            <Button title="Save" onPress={saveInterval} />
        </View>
    );
};

export default SettingsScreen;

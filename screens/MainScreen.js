// screens/MainScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifications } from 'expo';

const MainScreen = ({ navigation }) => {
    const [interval, setInterval] = useState(null);

    useEffect(() => {
        // When the screen loads, load the interval from storage
        loadInterval();
    }, []);

    const loadInterval = async () => {
        // Load the interval from AsyncStorage
        const storedInterval = await AsyncStorage.getItem('interval');
        if (storedInterval !== null) {
            setInterval(Number(storedInterval));
        }
    };

    const scheduleNotification = () => {
        // Schedule a notification for the future
        const notificationId = Notifications.scheduleLocalNotificationAsync(
            {
                // Notification content
                title: 'Reflection Time',
                body: 'Time to reflect on the past interval!',
            },
            {
                // Trigger the notification after the interval
                time: new Date().getTime() + interval * 60 * 1000,
            }
        );

        // Store the notification ID so we can cancel it if needed
        AsyncStorage.setItem('notificationId', notificationId);
    };

    return (
        <View>
            <Text>Main Screen</Text>
            <Text>Interval: {interval} minutes</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <Button title="Schedule Notification" onPress={scheduleNotification} />
        </View>
    );
};

export default MainScreen;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// 앱 기본 구조 설정
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MemoList"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="MemoList"
          component={MemoList} // MemoList 화면 컴포넌트는 이후 구현
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Stack = createStackNavigator();

// 메모 리스트 화면
function MemoList({ navigation }) {
  const [memos, setMemos] = useState([
    { id: '1', title: '첫번째 메모', description: '안녕하세요. 첫번째 메모를 작성 해보았습니다.', date: '2024-12-01' },
    { id: '2', title: '제목없음', description: '내용없음', date: '2024-12-01' },
  ]);
  const flatListRef = useRef(null);

  // 헤더 제목 업데이트
  useEffect(() => {
    navigation.setOptions({
      title: `메모리스트(${memos.length})`, // 동적으로 메모 개수 반영
    });
  }, [memos, navigation]);

  const addMemo = () => {
    const newMemo = {
      id: (memos.length + 1).toString(),
      title: '제목없음',
      description: '내용없음',
      date: new Date().toISOString().split('T')[0],
    };
    setMemos((prevMemos) => {
      const updatedMemos = [...prevMemos, newMemo];
      // 새로운 메모 추가 후 마지막 메모로 스크롤 이동
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
      return updatedMemos;
    });
  };

  const deleteMemo = (id) => {
    setMemos((prevMemos) => prevMemos.filter((memo) => memo.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={memos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memoItem}>
            <TouchableOpacity
              style={styles.memoContent}
              onPress={() =>
                navigation.navigate('MemoDetail', { memo: item, deleteMemo })
              }
            >
              <Text style= {styles.memoHeader}>
                <Text style={styles.memoTitle}>
                  {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}{' '}
                  <Text style={styles.memoDate}>{item.date}</Text> {/* 날짜 스타일 적용 */}
                </Text>
              </Text>
              <Text style={styles.memoContentText}>
                {item.description.length > 35 ? `${item.description.slice(0, 35)}...` : item.description}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMemo(item.id)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.memoList}
      />
      <TouchableOpacity style={styles.addButton} onPress={addMemo}>
        <Text style={styles.addButtonText}>추가</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 18, fontWeight: 'bold', padding: 16 },
  memoList: { paddingHorizontal: 16, paddingBottom: 80 },
  memoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  memoContent: { flex: 1 },
  memoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  memoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1, // 제목이 길어지면 공간을 차지하고 말줄임표가 적용됨
    marginRight: 8, // 날짜와 간격을 두기 위한 여백
    overflow: 'hidden', // 제목이 길어지면 넘치는 부분을 잘라냄
    textOverflow: 'ellipsis', // 말줄임표 적용
  },  
  memoDate: { fontSize: 14, color: '#666', width: 'auto' }, // 날짜 스타일 추가
  memoContentText: { fontSize: 14, color: '#666' },
  deleteButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  deleteText: { color: '#000', fontWeight: 'bold' },
  addButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MemoList"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' }, // 헤더 배경 검은색
          headerTintColor: '#fff', // 헤더 텍스트 흰색
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center', // 헤더 글자를 가운데 정렬
        }}
      >
        <Stack.Screen
          name="MemoList"
          component={MemoList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
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
                navigation.navigate('MemoDetail', {
                  memo: item,
                  updateMemo: setMemos,
                  deleteMemo,
                })
              }
            >
              <Text style= {styles.memoHeader}>
                <Text style={styles.memoTitle}>
                  {item.title.length > 18 ? `${item.title.slice(0, 18)}...` : item.title}{' '}
                  <Text style={styles.memoDate}>{item.date}</Text>
                </Text>
              </Text>
              <Text style={styles.memoContentText}>
                {item.description.length > 30 ? `${item.description.slice(0, 30)}...` : item.description}
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

function MemoDetail({ route, navigation }) {
  const { memo, updateMemo, deleteMemo } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(memo.title);
  const [description, setDescription] = useState(memo.description);

  const saveChanges = () => {
    updateMemo((prevMemos) =>
      prevMemos.map((m) =>
        m.id === memo.id
          ? { ...m, title, description, date: new Date().toISOString().split('T')[0] }
          : m
      )
    );
    setIsEditing(false);
    navigation.setOptions({ title });
  };

  const cancelChanges = () => {
    setTitle(memo.title);
    setDescription(memo.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteMemo(memo.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력하세요"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="내용을 입력하세요"
            multiline
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={saveChanges}>
              <Text style={styles.editButton}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelChanges}>
              <Text style={styles.cancelButton}>취소</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.dateAndButtons}>
            <Text style={styles.memoTitle}>{title}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={styles.editButton}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.detailDeleteButton}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.memoDate}>{memo.date}</Text>
          <Text style={styles.memoDescription}>{description}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
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
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 8, // 아래 여백 추가
  },
  memoDate: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 8, 
  },
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  buttonGroup: { 
    flexDirection: 'row',
    justifyContent: 'flex', 
    alignItems: 'center'
},
  editButton: { color: 'blue', marginHorizontal: 8, fontSize: 16 },
  detailDeleteButton: { color: 'red', marginHorizontal: 8, fontSize: 16 },
  cancelButton: { color: 'gray', fontSize: 16 },
  memoDescription: { fontSize: 16, color: '#666', marginVertical: 8 },
  dateAndButtons: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MemoList"
          component={MemoList}
          options={{
            title: '메모 목록',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen 
          name="MemoDetail" 
          component={MemoDetail} 
          options={{ 
            title: '메모 상세', 
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

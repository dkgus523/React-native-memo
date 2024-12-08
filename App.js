import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

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
      title: `메모리스트(${memos.length})`,
    });
  }, [memos, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={memos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memoItem}>
            <TouchableOpacity style={styles.memoContent}>
              <Text style={styles.memoHeader}>
                <Text style={styles.memoTitle}>
                  {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}{' '}
                  <Text style={styles.memoDate}>{item.date}</Text>
                </Text>
              </Text>
              <Text style={styles.memoContentText}>
                {item.description.length > 35 ? `${item.description.slice(0, 35)}...` : item.description}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.memoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  memoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  memoTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  memoDate: { fontSize: 14, color: '#666' },
  memoContentText: { fontSize: 14, color: '#666' },
});

export default MemoList;

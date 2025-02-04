import { Text , View, RefreshControl, ScrollView} from 'react-native'
import UserItem from './user-item'

const UserList = ({data}) => {
    const renderItem = ({item}) => {
        return <UserItem message={item.message}/>

    }
    return (
        <View>
           <ScrollView
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={false}
      onRefresh={() => console.log('refreshing...')}
    />
  }
>
  <View>
    {data.map((item) => (
      <View key={item.id}>{renderItem({ item })}</View>
    ))}
  </View>
</ScrollView>


            
        </View>
    );
}

export default UserList;
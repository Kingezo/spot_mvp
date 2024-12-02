import { Text , View, FlatList, RefreshControl } from 'react-native'
import UserItem from './user-item'

const UserList = ({data}) => {
    const renderItem = ({item}) => {
        return <UserItem message={item.message}/>

    }
    return (
        <View>
            <FlatList
            data = {data}
            keyExtractor={item=> item.id}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                refreshing={false}
                onRefresh={()=> console.log('refreshing...')}
                />
            }
            />

            
        </View>
    );
}

export default UserList;
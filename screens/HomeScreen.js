import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Animated, FlatList } from 'react-native'
import React, {useState, useRef } from 'react'
import ScreenWrapper from '../components/screenWrapper';

import SlidingUpPanel from 'rn-sliding-up-panel'
//import Carousel from 'react-native-snap-carousel'
//import { icons } from '../constants'

import {MaterialIcons} from '@expo/vector-icons'

const HomeScreen = () => {

    //Users Data
    const Users = [
        {
          key: '1',
          userImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          userName: 'Jessica',
          transactionDate: '25 April 20',
          amount: '$350',
          credit: true
        },
        {
          key: '2',
          userImage: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          userName: 'Micela',
          transactionDate: '16 April 20',
          amount: '$150',
          credit: false
        },
        {
          key: '3',
          userImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          userName: 'Gabriel',
          transactionDate: '05 April 20',
          amount: '$364',
          credit: false
        },
        {
          key: '4',
          userImage: 'https://images.pexels.com/photos/1082962/pexels-photo-1082962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          userName: 'Jasmine',
          transactionDate: '28 March 20',
          amount: '$100',
          credit: true
        },
        {
          key: '5',
          userImage: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          userName: 'Alex',
          transactionDate: '14 March 20',
          amount: '$450',
          credit: true
        },
        {
          key: '6',
          userImage: 'https://images.pexels.com/photos/1548164/pexels-photo-1548164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          userName: 'Mark',
          transactionDate: '05 March 20',
          amount: '$288',
          credit: true
        },
        {
          key: '7',
          userImage: 'https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          userName: 'Daria',
          transactionDate: '03 March 20',
          amount: '$350',
          credit: false
        },
        {
          key: '8',
          userImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          userName: 'George',
          transactionDate: '01 March 20',
          amount: '$350',
          credit: true
        },
      ]

    //Carousel Data
    const Images= [
        {
            image: require('../assets/card2.png'),
        },
        {
            image: require('../assets/card1.png'),
        },
    ];

    const {width, height} = Dimensions.get('window')
    //const carouselRef = useRef(null)

    const RenderItem = ({item}) => {
        return(
            <TouchableWithoutFeedback>
                <Image source = {item.image} style={{width: 340, height:210, borderRadius:10}} />
            </TouchableWithoutFeedback>
        )
    }

    // SLIDING PANEL

    const [dragRange, setDrageRange] = useState({
        top:height - 80, // Adjust this value to change the starting position
        bottom: 160
    })

    const _draggedValue = new Animated.Value(180);

    const ModalRef = useRef(null);



//export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style= {{paddingTop: 50, paddingHorizontal:14}}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style= {{fontSize:26, color: 'black' }}> Welcome Back,</Text>
                        <Text style= {{fontSize:26, opacity: 0.6, color:'black'}}> Gnoulelein Tako</Text>
                        </View>
                        <View>
                        <Image 
                         source={require('../assets/images/Gnoulelein.jpg')}
                         style={styles.ProfileImage}
                        />
                    <View style={styles.ProfileImageNotification}></View>
                    </View>
                </View>
                <View>
                   
                </View>

                <View>
                    <Text style={{ opacity:0.6, marginBottom:10}} > Invite To Group </Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.AddUser}>
                            <View style={styles.AddUserIconbg}>
                            <MaterialIcons name = 'add' color = 'black' size ={28} style = {{alignSelf: 'center'}} />
                            </View>
                            <Text style={{color: 'black'}}>Add Users</Text>
                        </TouchableOpacity>
                        <FlatList
                        horizontal
                        data={Users}
                        keyExtractor={item => item.key}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.AddUser}>
                                    <Image style={styles.AddUserIconbg} source={{uri: item.userImage}}/>
                                    <Text style={{color: 'black'}}> {item.userName}</Text>
                                </View>
                            )
                        }}
                        />
                    </View>
                </View>
            </View>

           

    </View>

  );

}
    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: 'white',
            paddingTop: 0
        },
        ProfileImage: {
            width:55,
            height:55,
            borderRadius:40,
            //aspectRatio: 1
        },
        ProfileImageNotification: {
            height: 12,
            width: 12,
            backgroundColor: '#4583ef',
            borderRadius: 6,
            position: 'abosolute',
            right: 6,
            borderWidth: 2,
            borderColor: '#000000'
        },
        AddUser: {
            height: 140,
            width:100,
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: '#F0FFF0',
            borderRadius: 10,
            marginRight: 14,
            borderColor: 'black',
            borderWidth: 2,
            
        },
        AddUserIconbg: {
            width: 70,
            height: 70,
            backgroundColor:'#F0FFF0',
            borderRadius: 10,
            marginBottom: 10,
            justifyContent: 'center'
        },
        PanelHandle: {
            height: 5,
            width: 50,
            backgroundColor: 'black',
            borderRadius: 6,
            alignSelf: 'center',
            marginTop: 6
        },
        PanelItemContainer: {
            borderWidth: 0.4,
            borderColor: 'black',
            padding: 14,
            borderRadius: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center' ,
            margingBottom: 20
        },
        PanelImage: {
            width: 30,
            height: 30,
            backgroundColor: '#FFFFFF',
            borderRadius: 40
        },
        PanelButton: {
            padding:14,
            width: 200,
            justifyContent: 'center',
            backgroundColor: 'gray',
            borderRadius: 10
          },
          PanelButtonText: {
            fontSize: 16,
            color: 'white',
            alignSelf: 'center'
          }
    })
//}
export default HomeScreen


/*Carousel 
                 layout={"tinder"}
                 ref={carouselRef}
                 data={Images}
                 renderItem = {RenderItem}
                 sliderWidth={width}
                 itemWidth={width-10}
                 swipeThreshold={100}
                 layoutCardOffset={-12}
                 inactiveSlideOpacity={0.4}
                 containerCustomStyle={{
                    overflow: 'visible',
                    marginVertical:30
                 }}
                 contentContainerCustomStyle={{
                    paddingTop:14
                 }}
                    */
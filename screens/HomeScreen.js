import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Animated, FlatList, Button, ScrollView } from 'react-native'
import React, {useState, useRef } from 'react'
import ScreenWrapper from '../components/screenWrapper';
import ProgressBar from '../components/ProgressBar';
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

    // Main Card info
    const balance = 2000.00; // Example balance amount
   const bankName = 'Your Bank'; // Example bank name

   // Progress Bar
   const [progress, setProgress] = useState(40);

   //Deals
   const Deals = [
    {
        key: '1',
        dealImage: require('../assets/images/benz-of-white-plains.png'),
        dealName: 'Mercedes, save 5% on your next car!',
    },
    {
    key: '2',
    dealImage: require('../assets/images/best-buy-logo.jpeg'),
    dealName: 'BestBuy, up to 10% on TVs!',
},
{
  key: '3',
  dealImage: require('../assets/images/mattress-firm-logo.png'),
  dealName: 'MattressFirm, 15% on mattresses!',
}
]



//export default function HomeScreen() {
    return (
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                            <Text style={{color: 'black'}}>Add Friends</Text>
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
            <View style={styles.container}>
      {/* Cash Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Current Pool</Text>
        <Text style = {{fontWeight: 'bold'}}>Payment Recieve Date, Nov 7th </Text>

        <View style = {{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: '20'}}>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        <View style={{ padding: 20 }}>
          <View style = {{marginTop: 0}}>
            <Text style = {{fontWeight: 'bold'}}>Next payment, Oct 31st </Text>
            <Text style= {styles.balanceAmount2}>$400 </Text>
          </View>

    </View> 
    </View>
    <ProgressBar progress={progress} />
        <TouchableOpacity style={styles.spotGroupButton}>
          <Text style={styles.buttonText}>Spot Group</Text>
        </TouchableOpacity>
      </View>

      {/* Linked Bank Info */}
      <View style={styles.linkedBankCard}>
        <Text style={styles.linkedBankTitle}>Spot Deals</Text>
        <Text style={styles.bankName}>Check out special deals from retailers near you that you can save for!</Text>
      </View>
    </View>
    <FlatList
                        horizontal
                        data={Deals}
                        keyExtractor={item => item.key}
                        renderItem={({item,index}) => {
                            return(
                              <TouchableOpacity style={styles.sliderImageContainer}>
                                     <Image style={styles.sliderImage} source={item.dealImage} resizeMode="cover" />
                                    <Text style={{color: 'black'}}> {item.dealName}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        />
    
    

           

    </View>
    </ScrollView>
</ScreenWrapper>
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
          },
          // Main Card styles
          balanceCard: {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: 20,
            marginBottom: 15,
            marginTop: 15,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          },
          balanceTitle: {
            fontSize: 18,
            color: '#333',
            fontWeight: 'bold',
            marginBottom: 10,
          },
          balanceAmount: {
            fontSize: 28,
            color: '#2E8B57',
            fontWeight: 'bold',
            
          },
          balanceAmount2: {
            fontSize: 20,
            color: '#2E8B57',
            fontWeight: 'bold',
            marginBottom: 0,
            marginTop: 0,
          },
          addMoneyButton: {
            backgroundColor: '#2E8B57',
            paddingVertical: 10,
            borderRadius: 5,
            marginBottom: 10,
            alignItems: 'center',
          },
          spotGroupButton: {
            backgroundColor: '#F0FFF0',
            paddingVertical: 10,
            borderRadius: 5,
            borderColor: '#F0FFF0',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            
          },
          buttonText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
          },
          linkedBankCard: {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          },
          linkedBankTitle: {
            fontSize: 18,
            color: '#333',
            fontWeight: 'bold',
            marginBottom: 5,
          },
          bankName: {
            fontSize: 16,
            color: '#555',
          },
          sliderImageContainer: {
            width: 270,
            height: 150,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: '#E0E0E0',    // Soft gray border
            backgroundColor: '#F8F8F8', // Light background for contrast
            justifyContent: 'center',   // Center image
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,               // For Android shadow
            marginRight: 15,
        },
        
        sliderImage: {
            width: '80%',               // Reduce the image size to 80% of container width
            height: '75%',              // Reduce the image size to 80% of container height
            borderRadius: 15,
            overflow: 'hidden',
        },
        
    })
//}
export default HomeScreen

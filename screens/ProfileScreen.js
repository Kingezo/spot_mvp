import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Animated, FlatList, ScrollView } from 'react-native'
import React, {useState, useRef } from 'react'
import ScreenWrapper from '../components/screenWrapper';
import CustomHeader from '../components/CustomHeader';
import SlidingUpPanel from 'rn-sliding-up-panel'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';
import { logoutUser } from '../redux/thunk';
import { useDispatch } from 'react-redux';


//import { icons } from '../constants'

import {MaterialIcons} from '@expo/vector-icons'
import { colors } from '../theme/ColorThemes';
import { Header } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
//import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = () => {

    const Banks = [
        {
            key: '1',
            bankImage: require('../assets/images/AFCU Logo.jpeg'),
            bankName: 'AFCU',
        },
        {
        key: '2',
        bankImage: require('../assets/images/Shape-of-the-Chase-logo.jpg'),
        bankName: 'Chase',
    }
    ]

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


    const {width, height} = Dimensions.get('window')
    //const carouselRef = useRef(null)

    const RenderItem = ({item}) => {
        return(
            <TouchableWithoutFeedback>
                <Image source = {item.image} style={{width: 340, height:210, borderRadius:10}} />
            </TouchableWithoutFeedback>
        )
    }
    
    const [dragRange, setDrageRange] = useState({
        top:height - 80, // Adjust this value to change the starting position
        bottom: 80
    })

    const _draggedValue = useRef(new Animated.Value(dragRange.bottom)).current;

    const ModalRef = useRef(null);

       // Progress Bar
   const [progress, setProgress] = useState(progress);

   // Log Out
   const dispatch = useDispatch();
   const handleLogout = () => {
    dispatch(logoutUser());
  };

    
    return (
        
        
           
             
          
        <View style={[styles.container, {paddingTop:25}]}>
            <CustomHeader 
            />
        <ScrollView showsVerticalScrollIndicator={false}>
            
                <View style={styles.ScoreContainer}>
            <View style={{flex:1, paddingTop: '50',  borderBlockColor: 'black',  }}>
                <View >
                <Text style={{ color: "black",  fontSize: 24, fontWeight:'bold' }}>Spot.Score</Text>
                <Text style={{  fontSize: 36, }}>81</Text>
                <ProgressBar progress={81} showPercentSign={true} />
                

            </View>
            <View style={{flexDirection:'row'}}>
            
        <TouchableOpacity>
            <Text style={{fontSize: 16, color: 'green',}}>Share this info </Text>
        </TouchableOpacity>
        <Text style={styles.bankName}>to increase your Spot.Score</Text>
            </View>
            </View>
            
        </View>
        
        
        <View style = {styles.BankContainer}>
                <Text style={{ color: "black",  fontSize: 24, alignItems:'center',  fontWeight: 'bold', marginBottom: 5,}}>Spot.Bank</Text>
                <View style = {{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: '20'}}>
                <Text style={{ fontSize: 24, alignItems:'center',}}>$500.00</Text>
                
      
      
      </View>
     <View style={{flexDirection: 'row', marginTop: 15,}}>
        <Text style={styles.bankName}>Account: ***0000 </Text>
        <Text style={styles.bankName}>     Routing: ***000 </Text>
     </View>
     <View style={{flexDirection:'row', justifyContent: 'space-around', padding: 16,}}>
     <TouchableOpacity style={ styles.ButtonBlock} onPress={() => console.log("Transfer pressed")}>
                <Text style={styles.buttonText}>Transfer to Bank</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ styles.ButtonBlock} onPress={() => console.log("Transfer pressed")}>
                <Text style={styles.buttonText}>Spot.Buy</Text>
      </TouchableOpacity>
     </View>
    
      
                </View>
                <View  style = {styles.BankContainer}>
                    <Text style={{ marginBottom:15, color: 'black', fontSize: 24, fontWeight: 'bold', flex: 1 }} >Banking Info </Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.AddUser}>
                            <View style={styles.AddBankIconBg}>
                            <MaterialIcons name = 'add' color = 'black' size ={28} style = {{alignSelf: 'center'}} />
                            </View>
                            <Text style={{color: 'black'}}>Add Bank</Text>
                        </TouchableOpacity>
                        <FlatList
                        horizontal
                        data={Banks}
                        keyExtractor={item => item.key}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.AddUser}>
                                    <Image style={styles.AddBankIconBg} source={item.bankImage}/>
                                    <Text style={{color: 'black'}}> {item.bankName}</Text>
                                </View>
                            )
                        }}
                        />
                    </View>
                </View>
           
                <View style = {styles.BankContainer2}>
                <Text style={{ color: "black",  fontSize: 24, alignItems:'center',  fontWeight: 'bold', marginBottom: 5,}}>Credit Journey</Text>
                <View style = {{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: '20'}}>
                <Text style={{ color: "black",  fontSize: 15, alignItems:'center', marginBottom: 10,}}>See how spot has impacted your credit score! </Text>
      </View>
      <View>
      <Image 
                source={require('../assets/images/credit-icon2.jpeg')}
                style={styles.creditImage}
            />
            <View style={{flexDirection: 'row'}}>
            <Text style={{ color: "black",  fontSize: 36,}}>741</Text>
           
            </View>
            <View style={{flexDirection: 'row'}}>
            <MaterialIcons name='arrow-drop-up' size={22} color='green' />
            <Text style={{ color: "green",  fontSize: 12, marginTop: 2}}> 2 points</Text>
            </View>
      </View>
      <View>
      <Text style={{ color: "black",  fontSize: 12, alignItems:'center', marginTop: 10, marginBottom: 10}}> Learn more about what Spot can do to improve your score! </Text>
      </View>
      <View style={{flexDirection: 'row',justifyContent: "space-between", alignItems: 'center', paddingHorizontal: '20'}}>
      <TouchableOpacity onPress={() => console.log("Settings pressed")}>
        <Ionicons name="help-circle" size={24} color="#00A86B" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Transfer pressed")}>
                <Text style={ styles.ButtonBlock}> See details</Text>
      </TouchableOpacity>
      </View>

                </View>
                <View style={styles.linkedBankCard}>
        <Text style={styles.bankName}>      Earn up to $50 when you</Text>
        <TouchableOpacity>
            <Text style={{fontSize: 16, color: 'green',}}> Spot friends!</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.linkedBankCard}>
        <View style={{marginLeft: 110}}>
      <TouchableOpacity style={ styles.ButtonBlock} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      </View>
      </View>
                <View style={{marginTop: 100}}>
                    <Text> Brought to you by Spot.Financial LLC</Text>
                </View>
            
                </ScrollView>
               
                    <View style={{flex:1}}>
                
                    <SlidingUpPanel 
                    ref={ModalRef}
                    draggableRange={dragRange} 
                    animatedValue={_draggedValue}
                    backdropOpacity={0}
                    snappingPoints={[360]}
                    height={height + 20}
                    friction={0.9}
                    >
                        <View style={{flex: 1, backgroundColor: 'white', borderColor: 'black', borderWidth: 1, borderRadius:24, padding:14}}>
                            <View style={styles.PanelHandle}></View>
                            <View>
                                <Text style = {{marginVertical: 16, color: '#F0FFF0000'}}>Recent Transactions</Text>
                            </View>

                            <View style={{height: 500, paddingBottom: 10}}>
                                <FlatList
                                data={Users}
                                keyExtractor={ item => item.key}
                                renderItem={({item}) => {
                                    return(
                                        <View style={styles.PanelItemContainer}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{marginRight: 10}}>
                                                <Image source={{uri: item.userImage}} style={styles.PanelImage} />
                                            </View>
                                            <View>
                                                <Text style={{fontSize: 14, color: '#F0FFF0000'}}>{item.userName}</Text>
                                                <Text style={{fontSize: 14, color: '#F0FFF0000'}}>{item.transactionDate}</Text>
                                                </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 16, color: '#F0FFF0000', marginHorizontal: 2}}>{item.amount}</Text>

                                {item.credit ? (
                                    <MaterialIcons name='arrow-drop-up' size={22} color='green' />
                                ) : (
                                    <MaterialIcons name='arrow-drop-down' size={22} color='#ff3838' />
                                )}
                                </View>
                            </View>
                        )
                        }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity style={styles.PanelButton}>
                        <Text style={styles.PanelButtonText}>View Full History</Text>
                        </TouchableOpacity>
                    </View>

                    </View>
                    </SlidingUpPanel>
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
       
        text: {
            color: colors.black
        },
        AddUser: {
            height: 140,
            width:100,
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: 'white',
            borderRadius: 10,
            marginRight: 14,
            borderColor: 'black',
            //borderWidth: 2,
            shadowColor: '#000',        // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow offset to create an undershadow
            shadowOpacity: 0.25,        // Shadow transparency
            shadowRadius: 4,            // Blurriness of the shadow
            // Shadow property for Android
            elevation: 2,               // Elevation level for shadow on Android
            
        },
        AddBankIconBg: {
            width: '100%',
            height: '50%',
            backgroundColor:'rgb(220 ,220 ,220 )',
            borderRadius: 10,
            marginBottom: 10,
            justifyContent: 'center'
        },
        ScoreBlock: {
            height: 200,
            width:200,
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: '#F0FFF0',
            borderRadius: 10,
            marginRight: 10,
            borderColor: 'black',
            borderWidth: 1
            
        },
        ButtonBlock: {
            padding:8,
            borderColor: 'black',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 25,
            backgroundColor: 'rgb(200,260,240)'
            
            
        },
        buttonText:{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',

        },
        PanelHandle: {
            height: 5,
            width: 50,
            backgroundColor: 'black',
            borderRadius: 6,
            alignSelf: 'center',
            marginTop: 10
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
          // Containers styles
          BankingInfoContainer: {
            padding: 20,
            backgroundColor: '#F0FFF0',
            borderRadius: 10,
            borderColor: 'black',
            marginVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
        },
        bankInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 10,
        },
        BankContainer: {
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: 'black',
            marginVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
        },
        ScoreContainer: {
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            borderColor: 'black',
            marginVertical: 10,
            //alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
        },
        BankContainer2: {
            padding: 20,
            backgroundColor: 'rgb(200,260,240)',
            borderRadius: 10,
            borderColor: 'black',
            marginVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            
        },
        creditImage: {
            width:55,
            height:55,
            borderRadius:40,
            alignItems: 'center',
            justifyContent: 'center',
            //marginLeft: 125
            //aspectRatio: 1
        },
        linkedBankCard: {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            marginBottom: 10,
            flexDirection: 'row',
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
        
    })
//}
export default ProfileScreen


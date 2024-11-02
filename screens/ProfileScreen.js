import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Animated, FlatList, ScrollView } from 'react-native'
import React, {useState, useRef } from 'react'
import ScreenWrapper from '../components/screenWrapper';
import CustomHeader from '../components/CustomHeader';
import SlidingUpPanel from 'rn-sliding-up-panel'


//import { icons } from '../constants'

import {MaterialIcons} from '@expo/vector-icons'
import { colors } from '../theme/ColorThemes';
import { Header } from '@react-navigation/stack';
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

    
    return (
        
        <ScreenWrapper>
           
             <CustomHeader 
            />
          
        <View style={[styles.container, {paddingTop:25}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            
                <View style={styles.ScoreContainer}>
            <View style={{flex:1, alignItems: 'center', paddingTop: '50',  borderBlockColor: 'black',  }}>
                <View style = {styles.ScoreBlock}>
                <Text style={{ color: "black",  fontSize: 24, alignItems:'center',}}> Spot.Score</Text>
                <Text style={{ color: "#00A86B",  fontSize: 36, alignItems:'center',}}> 81</Text>
                <Text style={{ color: "black",  fontSize: 24, alignItems:'center',}}> Good!</Text>
            </View>
            </View>
            
        </View>
        
        
        <View style = {styles.BankContainer}>
                <Text style={{ color: "black",  fontSize: 24, alignItems:'center',  fontWeight: 'bold',}}> Spot.Bank</Text>
                <View style = {{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: '20'}}>
                <Text style={{ color: "#00A86B",  fontSize: 24, alignItems:'center',}}> $500.00</Text>
                <TouchableOpacity onPress={() => console.log("Transfer pressed")}>
                <Text style={ styles.ButtonBlock}> Transfer</Text>
      </TouchableOpacity>
      
      </View>
      <View  style = {{ marginTop: 30}}>
                    <Text style={{ opacity:0.6, marginBottom:10, color: 'black', fontSize: 24, fontWeight: 'bold', flex: 1 }} > Banking Info </Text>
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
      
                </View>
                <View style = {styles.BankContainer2}>
                <Text style={{ color: "black",  fontSize: 24, alignItems:'center',  fontWeight: 'bold',}}>Spot.credit</Text>
                <View style = {{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: '20'}}>
                <Text style={{ color: "black",  fontSize: 24, alignItems:'center',}}> $500.00</Text>
                <TouchableOpacity onPress={() => console.log("Transfer pressed")}>
                <Text style={ styles.ButtonBlock}> See latest score</Text>
      </TouchableOpacity>
      </View>

                </View>
                <View>
                    <Text> Brough to you by Spot.Financial LLC</Text>
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
               
                </ScreenWrapper>
                 
               

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
            borderWidth: 2,
            shadowColor: '#000',        // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow offset to create an undershadow
            shadowOpacity: 0.25,        // Shadow transparency
            shadowRadius: 4,            // Blurriness of the shadow
            // Shadow property for Android
            elevation: 2,               // Elevation level for shadow on Android
            
        },
        AddBankIconBg: {
            width: 70,
            height: 70,
            backgroundColor:'#F0FFF0',
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
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: '#F0FFF0'
            
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
            alignItems: 'center',
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
            marginBottom: 100,
        },
        
    })
//}
export default ProfileScreen


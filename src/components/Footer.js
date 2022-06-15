import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';


function Footer() {

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    
    const [isloading, setIsloading] = useState(false);

    // useEffect(async() => {
        
    //     // console.log(await Voice.getSpeechRecognitionServices());
    //     // return () => {
    //     //     Voice.destroy().then(Voice.removeAllListeners);
    //     // }
    // }, [])


    const onSpeechStartHandler = (e) => {
        console.log("start");
        console.log("onSpeechStart", e);
    }

    const onSpeechEndHandler = (e) => {
        console.log("end");
        // setIsloading(false);
        console.log("onSpeechEnd", e);
    }

    const onSpeechResultsHandler = (e) => {
        console.log('result');
        let text = e.value[0];
        console.log("onSpeechResults", text);
        // if (value == "go to quiz page") {
        //     setIsloading(false);
        //     Voice.destroy().then(Voice.removeAllListeners)
        //     navigation.navigate('Quiz');
        // }
        console.log("onSpeechResults", e);
    }

    const startRecording = async () => {
        setIsloading(true);
        try {
            await Voice.start('en-Us');
            console.log(await Voice.isRecognizing());
            // console.log(res);
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const stopRecording = async () => {
        setIsloading(false);
        try {
            await Voice.stop()
        } catch (error) {
            console.log("error raised", error)
        }
    }


    return (
        <TouchableOpacity
            onPress={isloading ? stopRecording : startRecording}>
            <View style={styles.footer}>
                {isloading ? <ActivityIndicator size="large" color="red"></ActivityIndicator> :
                    <Ionicons
                        name='mic'
                        size={55}
                        color="#1D1042">
                    </Ionicons>}
            </View>
        </TouchableOpacity>

    );
}



const styles = StyleSheet.create({
    footer: {
        width: wp('100%'),
        height: hp('10%'),
        backgroundColor: '#FFF8F1',
        marginTop: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default Footer




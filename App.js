import * as React from "react";
import {useEffect, useState, useRef} from "react";
import { Platform, BackHandler, SafeAreaView, View } from "react-native";
import { WebView } from "react-native-webview";

const WEBVIEW = useRef()

const [backButtonEnabled, setBackButtonEnabled] = useState(false)

// Webview navigation state change listener
function onNavigationStateChange(navState) {
  setBackButtonEnabled(navState.canGoBack)
};

useEffect(() => {

  // Handle back event
  function backHandler() {
    if (backButtonEnabled) {
      WEBVIEW.current.goBack();
      return true;
    }
  };

  // Subscribe to back state vent
  BackHandler.addEventListener("hardwareBackPress", backHandler);

  // Unsubscribe
  return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);

}, [backButtonEnabled])

export default class App extends React.Component {
  render() {
    return (
      <WebView 
      ref={WEBVIEW}
      onNavigationStateChange={onNavigationStateChange}
      source={{ uri: "https://tataskyip.tv/" }} 
      />
    );
  }
}

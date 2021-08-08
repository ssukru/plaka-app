import React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/auth";
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddComment from "../screens/AddComment";
import { Icon } from "react-native-elements";

const Nav = () => {
  const AuthStack = createNativeStackNavigator();
  const NormalTab = createBottomTabNavigator();
  const auth = useAuth();

  return (
    <>
      {auth?.isAuthorized ? (
        <NormalTab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#4EE6AA",
            tabBarShowLabel: false,
            tabBarInactiveTintColor: "#d5d5d5",
          }}
        >
          <NormalTab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  type="ionicon"
                  name={focused ? "home" : "home-outline"}
                  size={30}
                  color={color}
                />
              ),
            }}
            name="ana sayfa"
            component={Home}
          />
          <NormalTab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  type="ionicon"
                  name={focused ? "add-circle" : "add"}
                  size={33}
                  color={color}
                />
              ),
            }}
            name="yorum ekle"
            component={AddComment}
          />
          <NormalTab.Screen
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  type="ionicon"
                  name={focused ? "person-circle" : "person-circle-outline"}
                  size={33}
                  color={color}
                />
              ),
              headerLeft: () => {
                return (
                  <Button
                    color="#159965"
                    title="çıkış yap"
                    onPress={() => auth.SignOut()}
                  />
                );
              },
              headerRight: () => {
                return (
                  <Button
                    color="#ddd"
                    title="düzenle"
                    onPress={() => alert("bi olayı yok su an")}
                  />
                );
              },
            }}
            name="profil"
            component={Profile}
          />
        </NormalTab.Navigator>
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="welcome" component={Welcome} />
        </AuthStack.Navigator>
      )}
    </>
  );
};

export default Nav;

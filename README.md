# Daug mobile app

This repo is the mobile app for Daug. It was built as part of the [MobileSpace](http://mobilespace.xyz/) [Season 2](https://github.com/mobilespace/Season2#season-2---looking-ahead) course by [Monte Thakkar](https://github.com/monte9/).

## What's Daug?

**Daug is a social network for pets.**

- Your pets can **sign up or login** using their paws.
- They can **upload selfies** or **post their thoughts** for other pets to see.
- They can also look at **other pets posts** and either **paw** (like) or **scratch** (dislike) it.

### [Demo - Try it on Expo](https://expo.io/@niszeto/daug-mobile)

## Getting started

```
git clone git@github.com:niszeto/daug-mobile.git

exp start

exp ios
```

## Designs

Intro, Login & Sign Up screens are based on **Robinhood App**.

Profile screen is based on **Instagram**.

Social Feed screen is based on **Facebook**.


## Assignment #1

### Objectives

- Learn how to build & organize screens in RN
- Learn advanced RN styling and use LinearGradient, Image, Icons & Custom Fonts
- Learn how to use mock data for prototyping UI screens
- Learn how to use NPM libaries such as React Native Elements, Expo & React Native Vector Icons

### TODO

- [x] Design & build an Intro Screen
  - [ ] :star: **Bonus:** Add [Snap Carousel](https://github.com/archriss/react-native-snap-carousel) with [Lottie animations](https://docs.expo.io/versions/latest/sdk/lottie.html) to Intro Screen
- [x] Design & build a Signup Screen
  - [ ] :star: **Bonus:** Add buttons to sign up with Facebook & Twitter
- [x] Design & build a Login Screen
  - [ ] :star: **Bonus:** Add buttons to login with Facebook & Twitter
- [x] Design & build a Profile Screen
  - [x] :star: **Bonus:** Add the Logout button
- [x] Design & build a Social Feed Screen with [Mock Data](https://raw.githubusercontent.com/mobilespace/daug-mobile/c4d4a331564ee490e1162f3733f3023afe3defc3/app/utils/constants.js)
- [x] Attach screenshots/gif of screens to `README.MD`

Demo

![](AssignmentOne.gif)

## Assignment #2

### Objectives

- Learn how to build navigation for Daug app using [React Navigation](https://reactnavigation.org/)
- Learn mobile design patterns for navigation & screen layouts
- Learn how to quickly build RN screens and hook them up using navigation

### TODO

- [x] Understand the 3 main navigation patterns for mobile apps:
  - [x] [StackNavigator](https://reactnavigation.org/docs/hello-react-navigation.html#creating-a-stacknavigator)
  - [x] [TabNavigator](https://reactnavigation.org/docs/tab-based-navigation.html)
  - [x] [DrawerNavigator](https://reactnavigation.org/docs/drawer-based-navigation.html)
- [x] Setup a **IntroStack** (using StackNavigator) for the Intro Screen (root), Login Screen (push) & Sign Up Screen (push)
- [x] Setup a **HomeTabs** (using TabNavigator) for the Social Feed Screen (default) and Profile Screen
- [x] Setup a **RootNavigator** (using StackNavigator) with the **IntroStack** & **HomeTabs** with `mode: "modal"`
- [x] Design & build an Edit Profile Screen
- [x] Setup a **ProfileStack** (using StackNavigator) for the Profile Screen (root), Post Details Screen (push) & Edit Profile Screen (modal) with mode: "modal" and custom RNE header component
- [x] Design & build a Post Details Screen
- [x] Design & build a Create Post Screen
- [x] Setup a **SocialStack** (using StackNavigator) for the Social Feed Screen (root), Post Details Screen (push) & Create Post Screen (modal) with mode: "modal" and custom RNE header component
- [ ] :star: **Bonus:** Display Posts on ProfileScreen
- [ ] :star: **Bonus:** Setup a **HomeNavigator**(using DrawerNavigator) with the **HomeTabs** (as root) and update **RootNavigator** to use **HomeNavigator** instead of **HomeTabs**
- [x] Add working gif of app to `README.MD`

### Demo
![](AssignmentTwo.gif)
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Video from "react-native-video";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.player = {};
    this.state = {
      player_status: {}
    }
  }

  _setPlayer(ref, key) {
    this.player[key] = {
      control: ref
    };
  }

  _switchPlayerStatus(status, key) {
    let temp = this.state.player_status;
    temp[key] = status;
    this.setState({
      player_status: temp
    });
  }

  _onPlayVideo(key) {
    this.player[key].control.presentFullscreenPlayer();
  }

  render() {
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
        data={[{ key: '1', url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4' }, { key: '2', url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }, {
          key: '3', url: 'http://www.w3school.com.cn/i/movie.mp4'
        }]}
        renderItem={({ item }) => <TouchableOpacity
          style={{
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00f'
          }}
          onPress={() => this._onPlayVideo(item.key)}
        >
          <Video
            // source={require('./background.mp4')} // 视频的URL地址，或者本地地址
            //source={require('./music.mp3')} // 可以播放音频
            source={{ uri: item.url }}
            ref={(ref) => this._setPlayer(ref, item.key)}
            rate={1} // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
            volume={1.0} // 声音的放声音的放大倍数大倍数，0 为静音 ，1 为正常音量 ，更大的数字表示放大的倍数
            muted={false} // true代表静音，默认为false.
            paused={false} // true代表暂停，默认为false
            resizeMode="contain" // 视频的自适应伸缩铺放行为，contain、stretch、cover
            repeat={true} // 是否重复播放
            playInBackground={false} // 当app转到后台运行的时候，播放是否暂停
            playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
            onLoadStart={() => this._switchPlayerStatus(0, item.key)} // 当视频开始加载时的回调函数
            onLoad={() => this._switchPlayerStatus(1, item.key)} // 当视频加载完毕时的回调函数
            // onProgress={this.setTime} // 进度控制，每250ms调用一次，以获取视频播放的进度
            // onEnd={this.onEnd} // 当视频播放完毕后的回调函数
            onError={(e) => {
              console.log(e)
            }} // 当视频不能加载，或出错后的回调函数
            style={styles.backgroundVideo} /><Text
              style={{
                fontSize: 30,
                color: '#F00'
              }}
            >{this.state.player_status[item.key] ? '点击全屏播放' : '加载中'}</Text>
        </TouchableOpacity>}
      />
    );
  }
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

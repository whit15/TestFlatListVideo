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

    this.state = {
      video_url: null
    }
  }

  _onPlayVideo(url) {
    console.log(url)
    this.setState({
      video_url: url
    })
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <FlatList
          style={{
            flex: 1,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={[{ key: '1', url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4' }, { key: '2', url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }]}
          renderItem={({ item }) => <View
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00f'
            }}
          >
            <TouchableOpacity
              onPress={() => this._onPlayVideo(item.url)}
            >
              <Text
                style={{
                  color: '#fff'
                }}
              >点击播放视频{item.key}</Text>
            </TouchableOpacity>
          </View>}
        />
        {
          this.state.video_url && <Video
            // source={require('./background.mp4')} // 视频的URL地址，或者本地地址
            //source={require('./music.mp3')} // 可以播放音频
            source={{ uri: this.state.video_url }}
            ref={(ref) => {
              this.player = ref;
            }}
            rate={1} // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
            volume={1.0} // 声音的放声音的放大倍数大倍数，0 为静音 ，1 为正常音量 ，更大的数字表示放大的倍数
            muted={false} // true代表静音，默认为false.
            paused={false} // true代表暂停，默认为false
            resizeMode="contain" // 视频的自适应伸缩铺放行为，contain、stretch、cover
            repeat={true} // 是否重复播放
            playInBackground={false} // 当app转到后台运行的时候，播放是否暂停
            playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
            onLoadStart={() => {
              console.log('开始加载视频')
            }} // 当视频开始加载时的回调函数
            onLoad={() => {
              console.log('加载视频完成')
            }} // 当视频加载完毕时的回调函数
            // onProgress={this.setTime} // 进度控制，每250ms调用一次，以获取视频播放的进度
            // onEnd={this.onEnd} // 当视频播放完毕后的回调函数
            onError={(e) => {
              console.log(e)
            }} // 当视频不能加载，或出错后的回调函数
            style={styles.backgroundVideo} />
        }
      </View>
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

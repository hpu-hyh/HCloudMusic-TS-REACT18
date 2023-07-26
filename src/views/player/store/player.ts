import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSongDetail, getSongLyric } from "../service/player";
import { ILyric, parseLyric } from "@/utils/parse-lyric";
import { IRootState } from "@/store";

export const fetchCuurentSongAction = createAsyncThunk<void, number, { state: IRootState }>('currentSong', (id: number, { dispatch, getState }) => {
  getSongLyric(id).then(res => {
    const lyricString = res.lrc.lyric
    const lyrics = parseLyric(lyricString)
    console.log(lyrics)
    dispatch(changeLyricsAction(lyrics))
  })

  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    getSongDetail(id).then(res => {
      if (!res.songs.length) return
      const song = res.songs[0]
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(changeCurrentSongAction(song))
      dispatch(changePlaySongListAction(newPlaySongList))

      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
    })
  } else {
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }


})

export const changeMusicAction = createAsyncThunk<void, boolean, { state: IRootState }>('changeMusic', (isNext, { dispatch, getState }) => {
  // 获取索引
  const playMode = getState().player.playMode
  const currentSongIndex = getState().player.playSongIndex
  const playSongList = getState().player.playSongList
  // 2.判断逻辑
  const length = playSongList.length
  let newIndex = currentSongIndex
  if (playMode === 1) {
    newIndex = Math.floor(Math.random() * length)
  } else {
    if (isNext) newIndex += 1
    else newIndex -= 1
    if (newIndex > length - 1) newIndex = 0
    if (newIndex < 0) newIndex = length - 1
  }
  // 3.获取当前歌曲
  const song = playSongList[newIndex]
  dispatch(changeCurrentSongAction(song))
  dispatch(changePlaySongIndexAction(newIndex))
  // 4.获取歌词数据
  getSongLyric(song.id).then((res) => {
    const lyricString = res.lrc.lyric
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })

})

interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}
const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
    {
      name: '有何不可',
      id: 167876,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5771,
          name: '许嵩',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000007916021',
      fee: 8,
      v: 49,
      crbt: null,
      cf: '',
      al: {
        id: 16953,
        name: '自定义',
        picUrl:
          'https://p2.music.126.net/Md3RLH0fe2a_3dMDnfqoQg==/18590542604286213.jpg',
        tns: [],
        pic_str: '18590542604286213',
        pic: 18590542604286212
      },
      dt: 241840,
      h: {
        br: 320000,
        fid: 0,
        size: 9675799,
        vd: -21099
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5805497,
        vd: -18400
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3870346,
        vd: -16900
      },
      a: null,
      cd: '1',
      no: 3,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 14026,
      publishTime: 1231516800000
    },
    {
      name: '雅俗共赏',
      id: 411214279,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5771,
          name: '许嵩',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 8,
      v: 31,
      crbt: null,
      cf: '',
      al: {
        id: 34749138,
        name: '青年晚报',
        picUrl:
          'https://p1.music.126.net/Wcs2dbukFx3TUWkRuxVCpw==/3431575794705764.jpg',
        tns: [],
        pic: 3431575794705764
      },
      dt: 249621,
      h: {
        br: 320000,
        fid: 0,
        size: 9987177,
        vd: -22200
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5992323,
        vd: -19600
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3994896,
        vd: -17800
      },
      a: null,
      cd: '1',
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mv: 5302271,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 14026,
      publishTime: 1461723397683
    }
  ],
  playSongIndex: -1,
  playMode: 0
}
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }

  }
})
export const { changeCurrentSongAction, changeLyricsAction, changeLyricIndexAction, changePlaySongIndexAction, changePlaySongListAction, changePlayModeAction } = playerSlice.actions
export default playerSlice.reducer

<template>
  <div class="hairphoto-view">
    <div class="hair-photo-list">
      <ul>
        <li v-for="(photo, index) in hairPhotos" :key="index">
          <div class="hair-photo-item" @click="previewHairPhoto(photo, hairPhotos)">
            <img :src="photo" alt="发型照片">
          </div>
          <mt-button type="danger" size="small" class="delete-btn" @click="deleteHairPhoto(index, user)"><i class="fa fa-times" aria-hidden="true"></i></mt-button>
        </li>
      </ul>
    </div>
    <div class="btn-wrap">
      <mt-button size="large" @click="handleAddImage" :disabled="hairPhotos.length >= 6">
        添加照片
      </mt-button>
    </div>
  </div>
</template>

<script>
import { updateUserHairPhotos } from '../api/api'
import { wxChooseImage, uploadWxImageList, getHairPhotoUrlList } from '../utils'

export default {
  name: 'HairPhotos',

  data () {
    return {
      hairPhotos: []
    }
  },

  methods: {
    /* eslint-disable */
    previewHairPhoto (cur, urls) {
      cur = `${location.protocol}//${location.hostname}/${cur}`
      urls = urls.map(url => `${location.protocol}//${location.hostname}/${url}`)
      wx.previewImage({
        current: cur, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    },

    handleAddImage () {
      if (this.hairPhotos.length >= 6) {
        this.$toast('最多添加六张图片')
        return
      }

      /* eslint-disable */ 
      let _this = this
      let max = 6
      let remainCount = max - this.hairPhotos.length
      wxChooseImage({ count: remainCount, sizeType: ['compressed'], sourceType: ['album', 'camera'] })
        .then(localIds => uploadWxImageList({ localIds, resultList: [] }))
        .then(serverIds => getHairPhotoUrlList({ serverIds, resultList: [] }))
        .then(photos => setHairPhotos(photos))
        .then(() => this.$toast('添加成功')) 
        .catch((e) => this.$toast('添加失败'))
      function setHairPhotos (photos) {
        for (let photo of photos) {
          if (typeof photo === 'string' && photo !== '') {
            _this.hairPhotos.push(photo)
          } else {
            continue
          }
        }
        return updateUserHairPhotos(_this.hairPhotos)
      }
    },

    deleteHairPhoto (index) {
      this.$messagebox.confirm('确定删除？').then(() => {
        this.hairPhotos.splice(index, 1)
        return updateUserHairPhotos(this.hairPhotos).then(() => {
          this.$toast('删除成功')
        })
      }).catch(() => {})
    }
  },

  mounted () {
    this.hairPhotos = this.$route.params.photos
  }
}
</script>

<style lang="scss">
.hair-photo-list {
  padding: 20px 8px;
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 12px;
    li {
      margin-bottom: 10px;
    }
  }
  .hair-photo-item {
    margin-right: 8px;
    position: relative;
    img {
      width: 80px;
      height: 80px;
    }
    .delete-btn {
      display: block;
      z-index: 10;
      position: absolute;
      top: 0;
      right: 0;
      color: red;
    }
  }
}
.btn-wrap {
  padding: 8px;
}
</style>

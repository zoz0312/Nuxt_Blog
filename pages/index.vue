<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Welcome to AJu Blog!
        </v-card-title>
        <v-card-text>
          개발중
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="$store.state.authUser === 'admin'"
            :to="'/posts/create'"
          >글 작성하기
          </v-btn>
          <v-btn
            v-if="$store.state.authUser === 'admin'"
            :to="'/category/create'"
          >카테고리 생성하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import '~/mixin/global_mixin'

export default {
}
</script>

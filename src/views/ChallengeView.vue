<template>
  <div class="challenge">
    <el-row>
      <el-col :span="16">
        <div class="body-left">
          <el-card class="challenge-info">
            <div class="challenge-title">
              <span>{{ challengeTitle }}</span>
            </div>
            <div class="challenge-body">
              <p>
                难度：
                <el-rate v-model="challengeDifficulty" size="default" disabled show-score score-template="{value}" />
              </p>
              <p>
                标签：
                <el-tag v-for="tag in tagList" :key="tag.id">
                  {{ tag.value }}
                </el-tag>
              </p>
              <p>分数： {{ challengeScore }}</p>
              <p>描述： {{ challengeDescribe }}</p>
              <p>
                附件：
                <el-button type="primary">
                  {{ challengeAttachment }}
                  <el-icon>
                    <Download />
                  </el-icon>
                </el-button>
              </p>
            </div>
            <div class="challenge-footer">
              <div class="start">
                <el-button type="primary"> 启动环境 </el-button>
              </div>
              <div class="starting">
                <div>
                  <span>靶机地址：</span>
                  <el-link type="warning" href="http://1.14.71.254:28939" target="_blank">1.14.71.254:28939</el-link>
                </div>
                <el-progress type="dashboard" :percentage="80">
                  <template>
                    <span>剩余:3280秒</span>
                  </template>
                </el-progress>
                <div class="control-pannel">
                  <el-button type="primary" text bg>延长时间</el-button>
                  <el-button type="danger" text bg>关闭环境</el-button>
                </div>
              </div>
              <div class="upload-flag">
                <el-input v-model="flagValue" placeholder="flag{......}">
                  <template #append>
                    <el-button type="primary">提交</el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </el-card>
          <el-card class="comment">
            <el-input v-model="commentText" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"
              placeholder="输入您的评论......" />
            <div class="upload-comment">
              <el-button type="primary">确定</el-button>
            </div>
            <div class="comment-list">
              <el-divider>
                <span class="header">评论区</span>
              </el-divider>
              <div class="comment-item">
                <el-link class="user" href="https://element.eleme.io" target="_blank"
                  :underline="false">罗老师yyds</el-link>
                <el-tag class="time" effect="plain" round>1周前</el-tag>
                <div class="text">想知道这个是怎么躲的呀，怎么直接得到那个密钥得到flag</div>
                <el-divider />
              </div>
              <el-pagination small background layout="prev, pager, next" :page-size="15" :total="20" />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="body-right">
          <el-card class="source-information">
            <el-row justify="space-evenly">
              <el-col :span="8"> 上传用户： </el-col>
              <el-col :span="8"> 管理员 </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 上传时间： </el-col>
              <el-col :span="8"> 2021-09-30 </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 题目状态： </el-col>
              <el-col :span="8">
                <el-tag type="success" round effect="dark">已解出</el-tag>
                <el-tag type="warning" round effect="dark">未解出</el-tag>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Download, Upload } from "@element-plus/icons-vue";
import { ITagItem } from "@/types";

export default defineComponent({
  name: "ChallengeView",
  props: {},
  components: { Download, Upload },
  setup() {
    const flagValue = ref("");
    const commentText = ref("")

    const challengeTitle = ref("TestChallengeTitle1");
    const challengeDifficulty = ref(3.7);
    const challengeScore = ref(3.7);
    const challengeDescribe = ref("TestChallengeDescribe1");
    const challengeAttachment = ref("TestChallengeAttachment1");
    const tagList = ref<ITagItem[]>([
      { id: 1, value: "Web" },
      { id: 2, value: "Pwn" },
      { id: 3, value: "Misc" },
    ]);
    return {
      flagValue,
      commentText,
      challengeTitle,
      challengeDifficulty,
      challengeScore,
      challengeDescribe,
      challengeAttachment,
      tagList,
    };
  },
});
</script>

<style scoped lang="scss">
.challenge {
  font-size: var(--el-font-size-extra-large);
  font-family: var(--el-font-family);

  .body-left {
    .challenge-info {
      .challenge-title {
        text-align: center;
      }

      .challenge-body {
        font-size: var(--el-font-size-large);
        color: var(--el-text-color-regular);

        :deep(.el-tag) {
          margin-right: 0.4rem;
        }

        :deep(.el-rate) {
          .el-rate__text {
            font-size: var(--el-font-size-large);
            color: var(--el-text-color-regular);
          }
        }
      }

      .challenge-footer {
        text-align: center;

        div {
          margin-bottom: 1rem;
        }

        .starting {
          div {
            font-size: var(--el-font-size-large);
            color: var(--el-text-color-regula);
          }

          :deep(.el-progress) {
            margin-bottom: 0;
            color: var(--el-text-color-regular);
          }

          :deep(.el-link__inner) {
            font-size: var(--el-font-size-large);
          }
        }

        .upload-flag {
          :deep(.el-button) {
            background-color: var(--el-button-bg-color);
            color: var(--el-button-text-color);
          }

          :deep(.el-button:hover) {
            background-color: var(--el-button-active-color);
            color: var(--el-button-hover-text-color);
          }
        }
      }
    }

    .comment {
      margin-top: 1rem;

      .upload-comment {
        margin-top: 1rem;
        text-align: right;
      }

      .comment-list {
        font-size: var(--el-font-size-medium);
        color: var(--el-text-color-regular);

        .header {
          font-weight: bolder;
        }

        .comment-item {
          font-size: var(--el-font-size-medium);

          .user {
            font-weight: bolder;
          }

          .time {
            margin-left: 0.5rem;
          }

          .text {
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
          }
        }
      }

    }
  }

  .body-right {
    .source-information {
      margin-left: 1rem;
      font-size: var(--el-font-size-medium);

      .el-row {
        padding: 0.5rem;
      }
    }
  }
}
</style>


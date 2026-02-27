# 💻Git

<BlogHead date="2025-12-30" tags="笔记📒"/>
📝记录一下git的实用场景

---

### 配置

1.生成ssh key（用于 GitHub、GitLab 等代码托管平台的认证，后续无需输入密码）

```bash
#方法一（推荐）：使用更安全的 Ed25519 算法
ssh-keygen -t ed25519 -C "your_email@example.com"

#方法二：使用 RSA 算法（兼容旧系统）
ssh-keygen -t rsa -C "your_email@example.com"
```

> tips: `-C` 是注释，一般填你的邮箱，方便识别，其实随便填也可以

2.查看生成的 SSH Key

```bash
#ed25519
cat ~/.ssh/id_ed25519.pub

#rsa
cat ~/.ssh/id_rsa.pub
```

3.测试ssh链接，如果看到 **You've successfully authenticated...**，说明配置成功！

```bash
# 测试 GitHub
ssh -T git@github.com

# 测试 GitLab
ssh -T git@gitlab.com
```

### 基础

首次使用 git 时，设置提交代码时的信息：

```bash
# 配置用户名(这里相当于提交人，设置了啥提交人就显示啥)
git config --global user.name "yourname"

# 配置用户邮箱(随意，只是用于显示，没啥鸟用)
git config --global user.email "youremail@xxx.com"

# 查看当前的配置信息
git config --global --list
```

第一次上传代码到远程仓库：

```bash
# 初始化
git init

# 提交文件到缓存区
git add .

# 提交到本地仓库
git commit -m "提交信息"

# 重命名分支(main是分支名，可以自由填写)
git branch -M main

# 关联远程仓库
git remote add origin 仓库地址

# 推送代码到远程仓库
git push -u origin main
```

### 其他

#### 场景：同步上游仓库代码

1.添加上游仓库地址

```bash
git remote add upstream 上游仓库地址
```

2.获取上游仓库的最新代码

```bash
git fetch upstream
```

3.将上游仓库的代码合并到当前分支

```bash
git merge upstream/main
```

如果你想保持提交历史的整洁，可以使用 `rebase` 代替 `merge`：

```bash
git rebase upstream/main
```

4.将合并后的代码推送到远程仓库(你自己 fork 的仓库)

```bash
git push origin main
```

⚠️ 注意：如果 rebase 之后与你 fork 的仓库有冲突，可能需要强制推送：

```bash
git push origin main --force-with-lease
```

#### 场景：修改本地git的提交邮箱后，想要对仓库的历史进行更改

1.重新配置正确的用户名和邮箱，参考上面的 [基础配置](#基础) 部分

2.创建存储库的全新裸克隆：

```bash
git clone --bare xxxxx
```

3.进入克隆的文件内，执行以下两个脚本

```bash
# 脚本1 - 对旧邮箱记录修改
git filter-branch --env-filter '
OLD_EMAIL="wxf@163.com"
CORRECT_NAME="XFeng"
CORRECT_EMAIL="wxfengg@qq.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags;

# 脚本2 - 对旧用户名记录修改
git filter-branch --env-filter '
OLD_NAME="XFeng"
CORRECT_NAME="XFeng"
CORRECT_EMAIL="wxfengg@qq.com"
if [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_NAME" = "$OLD_NAME" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags;
```

4.将更正的历史记录推送上去

```bash
git push --force --tags origin 'refs/heads/*'
```

#### 场景：提交完了一个 feature ，但是突然发现几个小问题，修改完之后不想新生成一个 commit

**`--amend`** 会把暂存区的内容与上一次提交合并，重新生成一个新的 commit 替换旧的 commit

**`--no-edit`** 不修改 commit message，直接复用原来的提交信息

🚨 注意：`amend` 会“改变历史”，因为 `amend` 会重写提交（新的 commit hash 会变）。 如果你已经 push 到远程且别人已经基于它开发

请不要随便 `amend`，否则容易引发冲突。

```bash
# 把修改的内容add进去
git add .
# 将修改的直接合并到上一个 commit 中，并且使用上一次的提交信息
git commit --amend --no-edit
```

#### 场景：本地提交了代码想取消本次提交让代码退回或者重新修改代码

```bash
# 这个命令会撤销最近一次的本地提交，但保留你的代码更改在暂存区（staged），你可以重新提交或修改后再提交
git reset --soft HEAD~1
```

#### 场景：删除了本地的提交想要恢复

```bash
# 查看日志获取提交hash
git reflog

# 根据提交hash恢复提交
git reset --hard {commit_hash}
```

#### 场景：更改提交信息不改动代码

```bash
# 输入命令进入修改
git commit --amend
```

#### 场景：GitHub默认不允许提交超过100M的文件，但是我们又想提交超过100M(需要先把上次提交撤销)

1.在项目的目录下打开终端，下载 `git lfs` 管理大文件：

```bash
git lfs install
```

2.添加需要上传的文件信息

```bash
git lfs track [文件路径]
```

eg： git lfs track ./test/demo.txt

3.输入命令后会生成 `.gitattributes` 文件，这时候把它跟需要上传的大文件一起提交即可

<br />

更加详细用法参考文章：[Git 指令看这一篇就够 —— 各种工作场景的 git 指令大全](https://www.cnblogs.com/jamiechoo/articles/18408791)

<br />后会生成 `.gitattributes` 文件，这时候把它跟需要上传的大文件一起提交即可

<br />

更加详细用法参考文章：[Git 指令看这一篇就够 —— 各种工作场景的 git 指令大全](https://www.cnblogs.com/jamiechoo/articles/18408791)

<br />

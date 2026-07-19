export const dataVersion = '2026.07.19-p0.1'

const original = {
  author: 'LookCook contributors',
  source: 'LookCook 原创整理（基于通用烹饪知识）',
  license: 'CC-BY-4.0',
  copyrightStatus: 'original-redistributable',
  reviewStatus: 'prototype-reviewed'
}

const i = (name, amount, unit, note = '') => ({ name, amount, unit, note })

export const recipes = [
  {
    id: 'tomato-scrambled-eggs', title: '番茄炒蛋', aliases: ['西红柿炒鸡蛋'], pinyin: 'fanqiechaodan', initials: 'fqcd',
    emoji: '🍅', colors: ['#ff7a59', '#ffd08a'], summary: '酸甜下饭的十分钟家常菜，新手也容易掌握。',
    tags: ['快手', '家常', '素食'], nutritionTags: ['含优质蛋白', '富含蔬果'], time: 12, difficulty: '简单',
    ingredients: [i('番茄', 2, '个'), i('鸡蛋', 3, '个'), i('小葱', 1, '根'), i('食用油', 15, '毫升'), i('盐', 2, '克'), i('白糖', 4, '克', '可选')],
    steps: ['番茄切块，小葱切末；鸡蛋加少许盐充分打散。', '热锅放一半油，倒入蛋液快速推炒至刚凝固，盛出备用。', '补入余油炒软番茄，加盐与白糖，倒回鸡蛋翻匀，撒葱花出锅。']
  },
  {
    id: 'green-pepper-potato', title: '青椒土豆丝', aliases: ['青椒炒土豆丝'], pinyin: 'qingjiaotudousi', initials: 'qjtds',
    emoji: '🥔', colors: ['#89b66f', '#f5c75b'], summary: '脆爽清香，掌握冲洗淀粉就能保持根根分明。',
    tags: ['快手', '家常', '素食'], nutritionTags: ['富含蔬菜'], time: 15, difficulty: '简单',
    ingredients: [i('土豆', 2, '个'), i('青椒', 1, '个'), i('蒜', 2, '瓣'), i('米醋', 8, '毫升'), i('盐', 3, '克'), i('食用油', 15, '毫升')],
    steps: ['土豆切细丝，清水冲洗两遍后沥干；青椒切丝，蒜切片。', '锅烧热放油，蒜片爆香后下土豆丝，大火翻炒约两分钟。', '加入青椒、盐和米醋，继续翻炒至断生，保持爽脆即可。']
  },
  {
    id: 'garlic-broccoli', title: '蒜蓉西兰花', aliases: ['蒜香西兰花'], pinyin: 'suanrongxilanhua', initials: 'srxlh',
    emoji: '🥦', colors: ['#3f9d72', '#b7dda1'], summary: '翠绿爽口的清淡小炒，适合搭配米饭或面食。',
    tags: ['快手', '清淡', '素食'], nutritionTags: ['富含蔬菜', '少油'], time: 12, difficulty: '简单',
    ingredients: [i('西兰花', 1, '颗'), i('蒜', 4, '瓣'), i('盐', 2, '克'), i('食用油', 12, '毫升'), i('清水', 30, '毫升')],
    steps: ['西兰花分小朵，用淡盐水浸泡后洗净；蒜切末。', '沸水中加少许盐，西兰花焯约一分钟后捞出沥水。', '热锅放油炒香蒜末，下西兰花和清水快速翻炒，加盐调味。']
  },
  {
    id: 'mushroom-greens', title: '香菇青菜', aliases: ['香菇小青菜'], pinyin: 'xiangguqingcai', initials: 'xgqc',
    emoji: '🍄', colors: ['#80634f', '#8ac786'], summary: '菌菇鲜香与青菜清甜相遇，简单但很有层次。',
    tags: ['家常', '清淡', '素食'], nutritionTags: ['富含蔬菜'], time: 16, difficulty: '简单',
    ingredients: [i('鲜香菇', 6, '朵'), i('小青菜', 300, '克'), i('蒜', 2, '瓣'), i('生抽', 8, '毫升'), i('盐', 2, '克'), i('食用油', 12, '毫升')],
    steps: ['香菇切片，青菜洗净沥干，蒜切末。', '热锅放油，先炒香蒜末与香菇，至香菇变软出香。', '加入青菜大火翻炒，淋生抽、加盐，菜叶刚软即出锅。']
  },
  {
    id: 'homestyle-tofu', title: '家常豆腐', aliases: ['烧豆腐'], pinyin: 'jiachangdoufu', initials: 'jcdf',
    emoji: '◻️', colors: ['#e6a04b', '#f7e0a3'], summary: '外香内嫩、酱汁浓郁，是一盘可靠的家常下饭菜。',
    tags: ['家常', '下饭', '素食'], nutritionTags: ['植物蛋白'], time: 25, difficulty: '普通',
    ingredients: [i('北豆腐', 400, '克'), i('青椒', 1, '个'), i('木耳', 40, '克', '泡发后'), i('生抽', 12, '毫升'), i('淀粉', 5, '克'), i('食用油', 20, '毫升')],
    steps: ['豆腐切厚片，青椒切块，木耳撕小朵；淀粉加清水调匀。', '平底锅放油，将豆腐两面煎至金黄，加入木耳翻炒。', '淋生抽和少量清水焖三分钟，加青椒，最后用水淀粉薄薄收汁。']
  },
  {
    id: 'onion-eggs', title: '洋葱炒鸡蛋', aliases: [], pinyin: 'yangcongchaojidan', initials: 'yccjd',
    emoji: '🧅', colors: ['#ad78b7', '#f0bf56'], summary: '洋葱甜润、鸡蛋柔软，一锅完成的快手搭配。',
    tags: ['快手', '家常'], nutritionTags: ['含优质蛋白'], time: 12, difficulty: '简单',
    ingredients: [i('洋葱', 1, '个'), i('鸡蛋', 3, '个'), i('盐', 2, '克'), i('食用油', 15, '毫升'), i('生抽', 5, '毫升', '可选')],
    steps: ['洋葱切丝；鸡蛋加少许盐打散。', '热锅放一半油，将鸡蛋炒至蓬松后盛出。', '补油炒软洋葱，倒回鸡蛋，加盐和生抽快速翻匀。']
  },
  {
    id: 'carrot-wood-ear', title: '胡萝卜炒木耳', aliases: [], pinyin: 'huluobuchaomuer', initials: 'hlbcme',
    emoji: '🥕', colors: ['#ed7f3a', '#635a45'], summary: '清脆色亮的素炒，口感丰富且适合便当。',
    tags: ['家常', '素食', '便当'], nutritionTags: ['富含蔬菜'], time: 18, difficulty: '简单',
    ingredients: [i('胡萝卜', 1, '根'), i('干木耳', 15, '克'), i('蒜', 2, '瓣'), i('生抽', 8, '毫升'), i('盐', 2, '克'), i('食用油', 12, '毫升')],
    steps: ['木耳充分泡发洗净，胡萝卜切薄片，蒜切末。', '热锅放油炒香蒜末，下胡萝卜翻炒至稍软。', '加入木耳炒熟，淋生抽并加盐；木耳需彻底加热后再出锅。']
  },
  {
    id: 'celery-tofu-strips', title: '芹菜炒香干', aliases: [], pinyin: 'qincaichaoxianggan', initials: 'qccxg',
    emoji: '🌿', colors: ['#6da76e', '#c79863'], summary: '芹菜爽脆、香干有嚼劲，十几分钟就能上桌。',
    tags: ['快手', '素食', '下饭'], nutritionTags: ['植物蛋白', '富含蔬菜'], time: 15, difficulty: '简单',
    ingredients: [i('芹菜', 250, '克'), i('香干', 200, '克'), i('蒜', 2, '瓣'), i('生抽', 10, '毫升'), i('盐', 2, '克'), i('食用油', 12, '毫升')],
    steps: ['芹菜去老筋切段，香干切条，蒜切片。', '锅中水沸后将芹菜焯三十秒，捞出沥水。', '热锅炒香蒜片和香干，加芹菜、生抽与盐，大火翻匀。']
  },
  {
    id: 'cucumber-chicken', title: '黄瓜炒鸡丁', aliases: ['宫保味以外的鸡丁'], pinyin: 'huangguachaojiding', initials: 'hgcjd',
    emoji: '🥒', colors: ['#6bbf73', '#e9c291'], summary: '清爽不辣的鸡丁做法，黄瓜最后下锅更脆。',
    tags: ['快手', '家常', '高蛋白'], nutritionTags: ['含优质蛋白', '富含蔬菜'], time: 22, difficulty: '普通',
    ingredients: [i('鸡胸肉', 250, '克'), i('黄瓜', 1, '根'), i('生抽', 10, '毫升'), i('淀粉', 6, '克'), i('盐', 2, '克'), i('食用油', 15, '毫升')],
    steps: ['鸡胸肉切丁，用一半生抽和淀粉抓匀；黄瓜切丁。', '热锅放油，将鸡丁滑炒至颜色完全变白。', '加入黄瓜丁和剩余生抽，大火翻炒一分钟，加盐出锅。']
  },
  {
    id: 'corn-carrot-rib-soup', title: '玉米胡萝卜排骨汤', aliases: ['玉米排骨汤'], pinyin: 'yumihuluobupaigutang', initials: 'ymhlbpgt',
    emoji: '🌽', colors: ['#f3bd4f', '#e98245'], summary: '清甜温润的一锅汤，适合周末慢慢炖。',
    tags: ['汤羹', '家常', '周末'], nutritionTags: ['含优质蛋白'], time: 80, difficulty: '普通',
    ingredients: [i('排骨', 500, '克'), i('甜玉米', 1, '根'), i('胡萝卜', 1, '根'), i('姜', 3, '片'), i('盐', 4, '克'), i('清水', 1500, '毫升')],
    steps: ['排骨冷水下锅焯出浮沫，捞出冲净；玉米和胡萝卜切块。', '排骨、姜片和清水入锅，煮沸后转小火炖四十分钟。', '加入玉米和胡萝卜再炖二十五分钟，最后加盐调味。']
  },
  {
    id: 'winter-melon-shrimp-soup', title: '冬瓜虾皮汤', aliases: [], pinyin: 'dongguaxiapitang', initials: 'dgxpt',
    emoji: '🥣', colors: ['#9dc7a9', '#d8ddc5'], summary: '汤色清亮、鲜味自然，工作日晚餐很轻松。',
    tags: ['快手', '汤羹', '清淡'], nutritionTags: ['少油'], time: 18, difficulty: '简单',
    ingredients: [i('冬瓜', 400, '克'), i('虾皮', 15, '克'), i('姜', 2, '片'), i('盐', 2, '克'), i('香油', 3, '毫升'), i('清水', 800, '毫升')],
    steps: ['冬瓜去皮切薄片，虾皮用清水快速冲洗。', '锅中加清水和姜片煮沸，放入冬瓜煮至半透明。', '加入虾皮再煮两分钟，加盐和少量香油即可。']
  },
  {
    id: 'seaweed-egg-soup', title: '紫菜蛋花汤', aliases: [], pinyin: 'zicaidanhuatang', initials: 'zcdht',
    emoji: '🍲', colors: ['#524f69', '#e6c45d'], summary: '五分钟完成的鲜香汤品，蛋花轻盈不结块。',
    tags: ['快手', '汤羹', '家常'], nutritionTags: ['含优质蛋白'], time: 8, difficulty: '简单',
    ingredients: [i('干紫菜', 8, '克'), i('鸡蛋', 2, '个'), i('小葱', 1, '根'), i('盐', 2, '克'), i('香油', 3, '毫升'), i('清水', 700, '毫升')],
    steps: ['紫菜撕小片，鸡蛋打散，小葱切末。', '清水煮沸后放入紫菜和盐，再次沸腾后转小火。', '沿锅边细细淋入蛋液，待蛋花浮起后关火，撒葱花和香油。']
  },
  {
    id: 'scallion-oil-noodles', title: '葱油拌面', aliases: ['葱油面'], pinyin: 'congyoubanmian', initials: 'cybm',
    emoji: '🍜', colors: ['#61885a', '#d5a047'], summary: '葱香包裹每根面条，材料少却很满足。',
    tags: ['主食', '快手', '素食'], nutritionTags: ['能量主食'], time: 18, difficulty: '简单',
    ingredients: [i('面条', 250, '克'), i('小葱', 6, '根'), i('生抽', 18, '毫升'), i('白糖', 4, '克'), i('食用油', 25, '毫升')],
    steps: ['小葱切长段；生抽和白糖调匀。', '冷油放葱段，小火慢炸至葱段变深黄，关火倒入调味汁。', '面条煮熟沥干，加入适量葱油汁拌匀。']
  },
  {
    id: 'tomato-egg-noodles', title: '番茄鸡蛋面', aliases: ['西红柿鸡蛋面'], pinyin: 'fanqiejidanmian', initials: 'fqjdm',
    emoji: '🍜', colors: ['#ee6e50', '#f2c75c'], summary: '汤汁酸甜、面条暖胃，一碗就是完整的一餐。',
    tags: ['主食', '家常', '一人食'], nutritionTags: ['含优质蛋白'], time: 20, difficulty: '简单',
    ingredients: [i('面条', 250, '克'), i('番茄', 2, '个'), i('鸡蛋', 2, '个'), i('小葱', 1, '根'), i('盐', 3, '克'), i('食用油', 12, '毫升')],
    steps: ['番茄切块，鸡蛋打散，小葱切末。', '热锅炒熟鸡蛋后盛出；原锅炒软番茄，加入清水煮开。', '下入面条煮熟，倒回鸡蛋，加盐调味并撒葱花。']
  },
  {
    id: 'mushroom-chicken-rice', title: '香菇鸡肉焖饭', aliases: ['香菇鸡腿焖饭'], pinyin: 'xianggujiroumenfan', initials: 'xgjrmf',
    emoji: '🍚', colors: ['#81614b', '#d6b27a'], summary: '饭菜一锅出，香菇和鸡肉的汁水都进入米粒。',
    tags: ['主食', '一锅出', '便当'], nutritionTags: ['含优质蛋白'], time: 50, difficulty: '普通',
    ingredients: [i('大米', 300, '克'), i('去骨鸡腿肉', 300, '克'), i('鲜香菇', 6, '朵'), i('胡萝卜', 0.5, '根'), i('生抽', 18, '毫升'), i('清水', 360, '毫升')],
    steps: ['大米淘洗；鸡肉切块，香菇切片，胡萝卜切丁。', '锅中少油将鸡肉炒至变色，加入香菇、胡萝卜和生抽翻匀。', '所有食材放入电饭锅，加清水，按正常煮饭程序；完成后焖十分钟拌匀。']
  },
  {
    id: 'potato-chicken', title: '土豆鸡块', aliases: ['土豆烧鸡'], pinyin: 'tudoujikuai', initials: 'tdjk',
    emoji: '🍗', colors: ['#c67a4a', '#dcb45a'], summary: '土豆吸满咸鲜汤汁，鸡块软嫩，是经典下饭组合。',
    tags: ['家常', '下饭', '周末'], nutritionTags: ['含优质蛋白'], time: 45, difficulty: '普通',
    ingredients: [i('鸡腿肉', 500, '克'), i('土豆', 2, '个'), i('姜', 3, '片'), i('生抽', 18, '毫升'), i('老抽', 5, '毫升'), i('清水', 500, '毫升')],
    steps: ['鸡腿肉剁块，土豆切滚刀块，姜切片。', '热锅少油煸香姜片和鸡块，至表面微黄，加入生抽和老抽。', '加清水焖二十分钟，放土豆再焖十五分钟，开盖收至汤汁浓稠。']
  },
  {
    id: 'pepper-beef', title: '彩椒牛肉', aliases: ['彩椒炒牛肉'], pinyin: 'caijiaoniurou', initials: 'cjnr',
    emoji: '🫑', colors: ['#d85648', '#f0bd4d'], summary: '彩椒鲜亮、牛肉嫩滑，适合想吃得丰富的工作日。',
    tags: ['快手', '下饭', '高蛋白'], nutritionTags: ['含优质蛋白', '富含蔬菜'], time: 25, difficulty: '普通',
    ingredients: [i('牛里脊', 250, '克'), i('红彩椒', 0.5, '个'), i('黄彩椒', 0.5, '个'), i('生抽', 12, '毫升'), i('淀粉', 6, '克'), i('食用油', 15, '毫升')],
    steps: ['牛肉逆纹切片，用生抽和淀粉抓匀；彩椒切块。', '锅烧至较热，放油后下牛肉快速滑炒至八成熟，盛出。', '原锅炒彩椒一分钟，倒回牛肉快速翻匀，完全熟透后出锅。']
  },
  {
    id: 'garlic-shrimp', title: '蒜香虾仁', aliases: ['蒜蓉虾仁'], pinyin: 'suanxiangxiaren', initials: 'sxxr',
    emoji: '🍤', colors: ['#ef7968', '#f2c7a0'], summary: '蒜香明亮、虾仁弹嫩，十几分钟做出清爽小菜。',
    tags: ['快手', '高蛋白', '家常'], nutritionTags: ['含优质蛋白'], time: 16, difficulty: '简单',
    ingredients: [i('虾仁', 300, '克'), i('蒜', 5, '瓣'), i('小葱', 1, '根'), i('盐', 2, '克'), i('黑胡椒', 1, '克'), i('食用油', 12, '毫升')],
    steps: ['虾仁去虾线后擦干，蒜切末，小葱切末。', '热锅放油，先用小火炒香一半蒜末。', '转中火放虾仁炒至完全变色卷曲，加盐、黑胡椒和剩余蒜末，撒葱花。']
  },
  {
    id: 'steamed-sea-bass', title: '清蒸鲈鱼', aliases: ['蒸鲈鱼'], pinyin: 'qingzhengluyu', initials: 'qzly',
    emoji: '🐟', colors: ['#6ca6b8', '#c8d9c9'], summary: '突出鱼肉本味的蒸制做法，计时准确就能鲜嫩。',
    tags: ['清淡', '高蛋白', '宴客'], nutritionTags: ['含优质蛋白', '少油'], time: 25, difficulty: '普通',
    ingredients: [i('鲜鲈鱼', 1, '条', '约600克'), i('姜', 6, '片'), i('小葱', 3, '根'), i('蒸鱼豉油', 18, '毫升'), i('食用油', 12, '毫升')],
    steps: ['鲈鱼处理干净并擦干，在鱼身放姜片和葱段。', '蒸锅水沸后放入鱼，大火蒸八至十分钟，关火焖两分钟。', '倒掉盘中水，去旧葱姜，放新葱丝，淋豉油与烧热的食用油。']
  },
  {
    id: 'millet-pumpkin-porridge', title: '小米南瓜粥', aliases: ['南瓜小米粥'], pinyin: 'xiaominanguazhou', initials: 'xmngz',
    emoji: '🎃', colors: ['#e99539', '#f2ca63'], summary: '自然香甜、口感绵软，早餐和夜宵都合适。',
    tags: ['早餐', '主食', '素食'], nutritionTags: ['能量主食'], time: 40, difficulty: '简单',
    ingredients: [i('小米', 120, '克'), i('南瓜', 300, '克'), i('清水', 1200, '毫升')],
    steps: ['小米淘洗一次，南瓜去皮切小块。', '水煮沸后下小米，搅拌防止沉底，再次沸腾后转小火。', '加入南瓜，小火煮三十分钟，中途搅拌，至米粒开花、南瓜软化。']
  },
  {
    id: 'yam-wood-ear', title: '山药炒木耳', aliases: [], pinyin: 'shanyaochaomuer', initials: 'sycme',
    emoji: '🤍', colors: ['#d9d1bc', '#625d50'], summary: '洁白爽脆的山药配木耳，清淡又有口感。',
    tags: ['清淡', '素食', '家常'], nutritionTags: ['富含蔬菜', '少油'], time: 20, difficulty: '普通',
    ingredients: [i('山药', 300, '克'), i('干木耳', 15, '克'), i('青椒', 0.5, '个'), i('蒜', 2, '瓣'), i('盐', 2, '克'), i('食用油', 12, '毫升')],
    steps: ['木耳充分泡发；山药戴手套去皮切片，泡清水；青椒切片。', '山药和木耳分别焯水一分钟，沥干备用。', '热锅炒香蒜片，加山药、木耳和青椒大火翻炒，加盐调味。']
  },
  {
    id: 'lotus-root-pork', title: '莲藕炒肉片', aliases: [], pinyin: 'lianouchaoroupian', initials: 'locrrp',
    emoji: '🪷', colors: ['#d5b3a2', '#a76b58'], summary: '莲藕清脆、肉片咸香，口感对比很讨喜。',
    tags: ['家常', '下饭'], nutritionTags: ['含优质蛋白'], time: 25, difficulty: '普通',
    ingredients: [i('莲藕', 300, '克'), i('猪里脊', 180, '克'), i('青椒', 0.5, '个'), i('生抽', 12, '毫升'), i('淀粉', 5, '克'), i('食用油', 15, '毫升')],
    steps: ['莲藕切薄片泡水；里脊切片，用一半生抽和淀粉抓匀；青椒切片。', '热锅放油，将肉片炒至变色后盛出。', '原锅炒莲藕至断生，加入青椒和肉片，淋剩余生抽翻匀。']
  },
  {
    id: 'green-bean-braised-noodles', title: '豆角焖面', aliases: ['扁豆焖面'], pinyin: 'doujiaomenmian', initials: 'djmm',
    emoji: '🍝', colors: ['#6f9b62', '#d6aa60'], summary: '面条吸足菜汁，一锅就能兼顾主食与蔬菜。',
    tags: ['主食', '一锅出', '家常'], nutritionTags: ['能量主食'], time: 35, difficulty: '普通',
    ingredients: [i('鲜面条', 350, '克'), i('豆角', 300, '克'), i('五花肉', 150, '克'), i('蒜', 3, '瓣'), i('生抽', 18, '毫升'), i('清水', 450, '毫升')],
    steps: ['豆角去筋掰段，五花肉切片，蒜切末。', '锅中煸香肉片和一半蒜末，放豆角炒至颜色变深，加生抽与清水。', '汤沸后铺上面条，盖盖小火焖十二分钟；确认豆角熟透，拌入剩余蒜末。']
  },
  {
    id: 'cold-cucumber', title: '凉拌黄瓜', aliases: ['拍黄瓜'], pinyin: 'liangbanhuanggua', initials: 'lbhg',
    emoji: '🥒', colors: ['#4da66a', '#b8d680'], summary: '清脆爽口的零火力小菜，蒜香与醋香很开胃。',
    tags: ['凉菜', '快手', '素食'], nutritionTags: ['富含蔬菜', '少油'], time: 10, difficulty: '简单',
    ingredients: [i('黄瓜', 2, '根'), i('蒜', 3, '瓣'), i('米醋', 15, '毫升'), i('生抽', 8, '毫升'), i('香油', 5, '毫升'), i('盐', 1, '克')],
    steps: ['黄瓜洗净拍裂后切段，蒜切末。', '米醋、生抽、香油、盐与蒜末调成料汁。', '料汁倒入黄瓜拌匀，静置五分钟后食用；现拌现吃口感最佳。']
  },
  {
    id: 'cabbage-vermicelli', title: '白菜粉丝煲', aliases: ['白菜炖粉丝'], pinyin: 'baicaifensibao', initials: 'bcfsb',
    emoji: '🥬', colors: ['#87aa72', '#d9c9a1'], summary: '白菜软甜、粉丝吸汁，冷天吃起来格外舒服。',
    tags: ['一锅出', '素食', '家常'], nutritionTags: ['富含蔬菜'], time: 28, difficulty: '简单',
    ingredients: [i('大白菜', 500, '克'), i('红薯粉丝', 100, '克'), i('鲜香菇', 4, '朵'), i('生抽', 15, '毫升'), i('蒜', 2, '瓣'), i('清水', 500, '毫升')],
    steps: ['粉丝温水泡软，白菜切块，香菇切片，蒜切末。', '锅中少油炒香蒜末和香菇，加入白菜炒至稍软。', '加生抽和清水煮沸，放粉丝小火煮八分钟，确认粉丝柔软后出锅。']
  },
  {
    id: 'corn-peas', title: '玉米豌豆小炒', aliases: ['松仁玉米简版'], pinyin: 'yumiwandouxiaochao', initials: 'ymwdxc',
    emoji: '🫛', colors: ['#e7b746', '#78a65f'], summary: '颜色明快、微甜清爽，大人孩子都容易接受。',
    tags: ['快手', '素食', '便当'], nutritionTags: ['富含蔬菜'], time: 12, difficulty: '简单',
    ingredients: [i('甜玉米粒', 200, '克'), i('豌豆', 120, '克'), i('胡萝卜', 0.5, '根'), i('盐', 2, '克'), i('食用油', 10, '毫升')],
    steps: ['胡萝卜切成与豌豆相近的小丁。', '玉米、豌豆和胡萝卜入沸水焯两分钟，捞出沥干。', '热锅放油，倒入全部食材大火翻炒两分钟，加盐调味。']
  }
].map((recipe) => ({ ...recipe, ...original, servings: 2 }))

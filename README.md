### rc-Hook-Form


##### 使用

* 目前默认在onchange时候做了表单验证

```
import React, { useRef, useState } from 'react';

import { Form, FormItem } from '@components/form/index.js';

const rules = {
  name: [
    {
      message: '必填',
      required: true,
    },
    {
      message: '邮箱',
      type: 'email',
    }
  ],
};

const form2 = {
  name: '',
  count: 2,
  time: [
    {
      id: 1
    }
  ],
};

function Test() {
  const formRef = useRef();
  const submitForm = () => {
    formRef.current.validatorForm((result, formData) => {
      console.log(result);
      console.log(formData);
    });
  };
  return (<div>
    <Form ref={formRef} labelPosition="left">
      <FormItem label="活动名称" isRequire prop="name" rules={rules.name} defaultValue={form.name}>
        <input fromctr="true" className='xt-input' type="text" />
      </FormItem>
      <button onClick={submitForm}>提交</button>
    </Form>
  </div>);
};

export default Test;

```

#### Form


| 参数        | 类型    |  默认值  |   描述    |
| --------   | -----:   | :----: |:----: |
| labelPosition  | string | left |  label对齐方式（left,top,right）  |
| className  |  string    |       |  form组件classname |
| ref | React-ref  |       |  form的ref，通过此调用form方法 |

###### ref 上的方法

* ref.getFormData(format) 返回当前整个表单值

> format // 需要格式话成的form数据结构
>>> 若表单无深层嵌套无需传递

```
 let form = {
    a: {
        b: {
            value: ''
        }
    }
 }

通过输入框改变value值为2

调用 ref.getFormData()
返回 { a.b.value: 2 }

调用 ref.getFormData(form)
返回 {
   a: {
       b: {
           value: 2
       }
   }
}
```

* ref.validatorForm(call, format) 验证整个表单返回结果和表单值

>> call(resule, formData)
>>> resule 布尔值标识验证是否通过
>>> formData 表单数据

>> format 与ref.getFormData(format)一致


##### FormItem

* 注意：表单中的真正表单组件上需要添加formctr="true",让FormItem知道此组件为真正需要受控的表单组件

```
 <FormItem label="用户名" isRequire prop="name" rules={rules.name} defaultValue={form.name}>
   <input fromctr="true" className='xt-input' type="text" />
   <span>163/qq等邮箱</span>
</FormItem>
 <FormItem label="计数器" isRequire prop="count" rules={rules.count} defaultValue={form.count}>
   <Test fromctr="true"/>
   <span>计数</span>
 </FormItem>

```

| 参数   | 类型    |  默认值  |   描述    |
| --------   | -----:   | :----: |:----: |
| label  | string |  |  label名称  |
| defaultValue  |  any    |       |  默认值 |
| contentClass | className  |       | 表单容器的className |
| errClass | className  |       | 错误信息容器的className |
| rules | Object || arry  |       | 验证规则 |
| isRequire | boolean || false  |       | label前显示必填样式 |
| prop | string || 必填  |       | 当前属性在表单对象中的位置 |

* prop 说明

```
let form = {
    a: '',
    b: [
        {
            name: ""
        }
    ]
}

FormItem  a 对应的prop为 prop="a"
FormItem  b[1] 对应的prop为 prop='b[1]['name']'
```

### 表单验证

* 详情规则可以查看 [async-validator](https://www.npmjs.com/package/async-validator)

```
const rules = {
   name: [
     {
       message: '必填',
       required: true,
     },
     {
       message: '邮箱',
       type: 'email',
     },
     {
        message: '同步自定义验证规则',
        validator: (rule, value) => value === 'muji',
     },
     {
        message: '异步自定义验证规则',
        asyncValidator: (rule, value) => {
           return new Promise((resolve, reject) => {
             if (value < 18) {
               reject("too young");  // reject with error message
             } else {
               resolve();
             }
           });
        }
     },
   ],
 };
```

##### 自定义非原生表单组件（input radio 等），使用遵循规范

```
const Test = function({ value, onChange }) {
  const [count, setCount] = useState(value);
  const addCount = () => {
    const value = count + 1;
    setCount(value);
    // FotmItem组件会为你的组件自动注入一个onChange事件，在自定义组件中修改值后，要将值传递给form,调用onChang按照如下格式使用
    onChange({
      target: {
        value: value,
      },
    });
  };
  return (<div onClick={addCount}>{count}</div>);
};

```




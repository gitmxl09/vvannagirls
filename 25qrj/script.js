// ******************** DOM 元素获取 ********************
// 输入框
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

// 实时显示输入内容的段落及其内部的动态文本占位符
const realTimeDisplay = document.getElementById('real-time-display');
const realTimeSpan1 = document.getElementById('real-time-span1');
const realTimeSpan2 = document.getElementById('real-time-span2');

// 初始段落及其内部的动态文本占位符
const initialParagraph = document.getElementById('initial-paragraph');
const initialSpan1 = document.getElementById('initial-span1');
const initialSpan2 = document.getElementById('initial-span2');

// 确定按钮
const confirmBtn = document.getElementById('confirm-btn');

// 主选项按钮容器
const mainOptions = document.getElementById('main-options');

// 主选项按钮
const mainOptionBtns = document.querySelectorAll('.main-option');
// 主选项对应的动态内容段落
const mainContents = document.querySelectorAll('.main-content');

// 子选项按钮
const subOptions = document.querySelectorAll('.sub-option');
// 子选项对应的子动态内容段落
const subContents = document.querySelectorAll('.sub-content');
// 子选项按钮组
const subOptionGroups = document.querySelectorAll('.sub-options');

// ******************** 辅助函数 ********************
/**
 * 计算字符串的有效长度，一个汉字算两个字符
 * @param {string} str - 要计算长度的字符串
 * @returns {number} - 字符串的有效长度
 */
function getStringLength(str) {
    return str.replace(/[^\x00-\xff]/g, 'aa').length;
}

/**
 * 限制输入框的输入长度，确保不超过 20 个字符（汉字算两个字符）
 * @param {HTMLInputElement} input - 要限制长度的输入框元素
 */
function limitInputLength(input) {
    const value = input.value;
    let newLength = 0;
    let newText = '';
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        const charLength = /[^\x00-\xff]/.test(char)? 2 : 1;
        if (newLength + charLength <= 20) {
            newLength += charLength;
            newText += char;
        } else {
            break;
        }
    }
    input.value = newText;
}

// ******************** 核心功能函数 ********************
/**
 * 更新所有动态显示的内容，包括实时显示、初始段落、主选项动态内容和子选项子动态内容
 */
function updateContent() {
    const value1 = input1.value;
    const value2 = input2.value;

    // 更新实时显示内容
    realTimeSpan1.textContent = value1;
    realTimeSpan2.textContent = value2;

    // 更新初始段落内容
    initialSpan1.textContent = value1;
    initialSpan2.textContent = value2;

    // 更新主选项动态内容中的动态文本占位符
    const dynamicSpans1 = document.querySelectorAll('.dynamic-span1');
    const dynamicSpans2 = document.querySelectorAll('.dynamic-span2');
    dynamicSpans1.forEach(span => span.textContent = value1);
    dynamicSpans2.forEach(span => span.textContent = value2);

    // 更新子选项子动态内容中的动态文本占位符
    const subDynamicSpans1 = document.querySelectorAll('.sub-dynamic-span1');
    const subDynamicSpans2 = document.querySelectorAll('.sub-dynamic-span2');
    subDynamicSpans1.forEach(span => span.textContent = value1);
    subDynamicSpans2.forEach(span => span.textContent = value2);
}

// ******************** 事件处理函数 ********************
/**
 * 处理输入框输入事件，限制输入长度并更新显示内容
 * @param {HTMLInputElement} input - 发生输入事件的输入框元素
 */
function handleInputChange(input) {
    limitInputLength(input);
    updateContent();
}

/**
 * 处理确定按钮点击事件，检查输入框内容，显示初始段落和主选项按钮组，并更新内容
 */
function handleConfirmClick() {
    const value1 = input1.value;
    const value2 = input2.value;
    if (value1.trim()!== '' && value2.trim()!== '') {
        // 显示初始段落
        initialParagraph.classList.remove('hidden');
        // 显示主选项按钮组
        mainOptions.classList.remove('hidden');
        // 更新内容
        updateContent();
    } else {
        alert('请确保两个输入框都有内容！');
    }
}

/**
 * 处理主选项按钮点击事件，显示对应的主选项动态内容和子选项按钮组，并禁用其他主选项按钮
 * @param {HTMLButtonElement} option - 被点击的主选项按钮元素
 */
function handleMainOptionClick(option) {
    const contentId = option.dataset.content;
    const content = document.getElementById(contentId);
    const subOptionGroup = document.querySelector(`.sub-options[data-main="${contentId}"]`);

    // 显示对应的主选项动态内容
    content.classList.remove('hidden');
    // 显示对应的子选项按钮组
    subOptionGroup.classList.remove('hidden');

    // 禁用其他主选项按钮
    mainOptionBtns.forEach(opt => {
        if (opt!== option) {
            opt.disabled = true;
        }
    });
}

/**
 * 处理子选项按钮点击事件，显示对应的子选项子动态内容，并禁用当前主选项下的其他子选项按钮
 * @param {HTMLButtonElement} option - 被点击的子选项按钮元素
 */
function handleSubOptionClick(option) {
    const contentId = option.dataset.content;
    const content = document.getElementById(contentId);

    // 显示对应的子选项子动态内容
    content.classList.remove('hidden');

    // 禁用当前主选项下的其他子选项按钮
    const parentSubOptions = option.parentNode.querySelectorAll('.sub-option');
    parentSubOptions.forEach(opt => {
        if (opt!== option) {
            opt.disabled = true;
        }
    });
}

// ******************** 事件绑定 ********************
// 绑定输入框输入事件
input1.addEventListener('input', () => handleInputChange(input1));
input2.addEventListener('input', () => handleInputChange(input2));

// 绑定确定按钮点击事件
confirmBtn.addEventListener('click', handleConfirmClick);

// 绑定主选项按钮点击事件
mainOptionBtns.forEach(option => {
    option.addEventListener('click', () => handleMainOptionClick(option));
});

// 绑定子选项按钮点击事件
subOptions.forEach(option => {
    option.addEventListener('click', () => handleSubOptionClick(option));
});

// 页面加载时初始化内容
updateContent();
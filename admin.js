
/* 可选：连接 Firebase 后台（未配置时页面可正常打开，但不连云端） */
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE.firebaseapp.com",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE.appspot.com",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE"
};
console.log("Admin offline shell ready. Add Firebase config to enable login & editing.");

/* 你配置 Firebase 后，可启用以下示例：
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

login.onclick = async ()=>{
  const email = document.getElementById('email').value;
  const pwd = document.getElementById('pwd').value;
  await signInWithEmailAndPassword(auth, email, pwd);
  alert('登录成功');
};
logout.onclick = ()=> signOut(auth);

auth.onAuthStateChanged(async (user)=>{
  document.getElementById('logout').style.display = user ? 'inline-block' : 'none';
  if(user){
    const snap = await getDocs(collection(db,"cars"));
    // 渲染后台车辆列表 …
  } else {
    // 未登录
  }
});
*/

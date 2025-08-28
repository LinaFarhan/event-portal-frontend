<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">تسجيل الدخول</h2>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            v-model="loginData.email"
            required
            placeholder="أدخل بريدك الإلكتروني"
            :class="{'error-input': errors.email}"
          />
          <span class="error-text" v-if="errors.email">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            v-model="loginData.password"
            required
            placeholder="أدخل كلمة المرور"
            :class="{'error-input': errors.password}"
          />
          <span class="error-text" v-if="errors.password">{{ errors.password }}</span>
        </div>
        
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}
        </button>
      </form>
      
      <div v-if="errorMessage" class="error-message">
        <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="success-message">
        <i class="fas fa-check-circle"></i> {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      loading: false,
      errorMessage: '',
      successMessage: '',
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    validateForm() {
      this.errors = { email: '', password: '' }
      let isValid = true

      // التحقق من البريد الإلكتروني
      if (!this.loginData.email) {
        this.errors.email = 'البريد الإلكتروني مطلوب'
        isValid = false
      } else if (!this.isValidEmail(this.loginData.email)) {
        this.errors.email = 'صيغة البريد الإلكتروني غير صحيحة'
        isValid = false
      }

      // التحقق من كلمة المرور
      if (!this.loginData.password) {
        this.errors.password = 'كلمة المرور مطلوبة'
        isValid = false
      } else if (this.loginData.password.length < 6) {
        this.errors.password = 'كلمة المرور يجب أن تكون على الأقل 6 أحرف'
        isValid = false
      }

      return isValid
    },
    isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    async handleLogin() {
      // إعادة تعيين الرسائل
      this.errorMessage = ''
      this.successMessage = ''
      
      // التحقق من صحة البيانات
      if (!this.validateForm()) {
        return
      }
      
      this.loading = true;
      
      try {
        // إرسال طلب تسجيل الدخول إلى الخادم
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.loginData)
        });
        
        // الحصول على البيانات كـ JSON
        const data = await response.json();
        
        console.log('استجابة الخادم:', data); // للتdebugging
        
        if (response.ok && data.success) {
          this.successMessage = data.message || 'تم تسجيل الدخول بنجاح!';
          
          // تخزين token في localStorage
          if (data.token) {
            localStorage.setItem('authToken', data.token);
          }
          
          // تخزين بيانات المستخدم إذا موجودة
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          
          // توجيه المستخدم إلى الصفحة الرئيسية بعد ثانيتين
          setTimeout(() => {
            this.router.push('/events');
          }, 2000);
          
        } else {
          // معالجة الأخطاء من الخادم
          this.errorMessage = data.message || data.error || 'فشل تسجيل الدخول';
          
          // معالجة أخطاء التحقق من الصحة من الخادم
          if (data.errors) {
            for (const key in data.errors) {
              if (data.errors[key]) {
                this.errors[key] = data.errors[key];
              }
            }
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصال الشبكة.';
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // إذا كان المستخدم مسجلاً بالفعل، توجيهه إلى الصفحة الرئيسية
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.push('/events');
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.error-input {
  border-color: #e74c3c !important;
}

.error-text {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-top: 0.5rem;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 0.8rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-align: center;
  border-left: 4px solid #c33;
}

.success-message {
  background-color: #effdef;
  color: #2e7d32;
  padding: 0.8rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-align: center;
  border-left: 4px solid #2e7d32;
}
</style>
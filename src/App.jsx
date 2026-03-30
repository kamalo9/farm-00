import React, { useState, useEffect } from 'react';
import {
  Beaker,
  BookOpen,
  Video,
  LogOut,
  CheckCircle,
  AlertCircle,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building,
  PlayCircle,
  Award,
  Calendar,
  FileText,
} from 'lucide-react';

// --- بيانات مساعدة ---
const GOVERNORATES = [
  'الإسماعيلية',
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية',
  'البحر الأحمر',
  'البحيرة',
  'الفيوم',
  'الغربية',
  'المنوفية',
  'المنيا',
  'القليوبية',
  'الوادي الجديد',
  'السويس',
  'اسوان',
  'اسيوط',
  'بني سويف',
  'بورسعيد',
  'دمياط',
  'الشرقية',
  'جنوب سيناء',
  'كفر الشيخ',
  'مطروح',
  'الأقصر',
  'قنا',
  'شمال سيناء',
  'سوهاج',
];

const GRADES = [
  { id: '1', name: 'الصف الأول الثانوي' },
  { id: '2', name: 'الصف الثاني الثانوي' },
  { id: '3', name: 'الصف الثالث الثانوي' },
];

export default function App() {
  // حالة التطبيق: 'login', 'register', 'dashboard'
  const [currentView, setCurrentView] = useState('login');

  // بيانات المستخدم الحالي المسجل للدخول
  const [currentUser, setCurrentUser] = useState(null);

  // قاعدة بيانات وهمية في الذاكرة لتجربة التسجيل والدخول
  const [usersDb, setUsersDb] = useState([]);

  // تحميل المستخدمين من LocalStorage (للحفاظ على البيانات عند التحديث الوهمي)
  useEffect(() => {
    const savedUsers = localStorage.getItem('chema_users');
    if (savedUsers) {
      setUsersDb(JSON.parse(savedUsers));
    }
  }, []);

  // --- دوال مساعدة ---
  const generateUniqueCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // كود من 4 أرقام
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-50 font-sans text-right"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {currentView === 'login' && (
        <LoginScreen
          onNavigate={(view) => setCurrentView(view)}
          onLogin={handleLoginSuccess}
          usersDb={usersDb}
        />
      )}
      {currentView === 'register' && (
        <RegisterScreen
          onNavigate={(view) => setCurrentView(view)}
          onRegister={(newUser) => {
            const updatedDb = [...usersDb, newUser];
            setUsersDb(updatedDb);
            localStorage.setItem('chema_users', JSON.stringify(updatedDb));
            handleLoginSuccess(newUser);
          }}
          usersDb={usersDb}
          generateCode={generateUniqueCode}
        />
      )}
      {currentView === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

// ==========================================
// 1. شاشة تسجيل الدخول
// ==========================================
function LoginScreen({ onNavigate, onLogin, usersDb }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    const user = usersDb.find((u) => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-teal-600 p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full text-teal-600">
              <Beaker size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Chema</h1>
          <p className="text-teal-100">منصتك الأولى لإتقان الكيمياء</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">تسجيل الدخول</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors mt-6 shadow-md shadow-teal-500/30"
            >
              دخول
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            ليس لديك حساب؟{' '}
            <button onClick={() => onNavigate('register')} className="text-teal-600 font-bold hover:underline">
              إنشاء حساب جديد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. شاشة إنشاء حساب جديد (حسب المتطلبات)
// ==========================================
function RegisterScreen({ onNavigate, onRegister, usersDb, generateCode }) {
  const [formData, setFormData] = useState({
    fullName: '',
    studentPhone: '',
    parentPhone: '',
    learningMode: 'online', // center, online
    governorate: 'الإسماعيلية',
    grade: '1',
    email: '',
    gender: 'male', // male, female
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // 1. فحص الاسم الثلاثي
    const nameWords = formData.fullName.trim().split(/\s+/);
    if (nameWords.length < 3) return 'يجب إدخال الاسم ثلاثي على الأقل.';

    // 2. فحص أرقام الهواتف (يجب ألا تتطابق)
    if (!formData.studentPhone || !formData.parentPhone) return 'يرجى إدخال أرقام الهواتف.';
    if (formData.studentPhone === formData.parentPhone)
      return 'لا يمكن أن يكون رقم الطالب هو نفسه رقم ولي الأمر.';

    // فحص طول رقم الهاتف التقريبي (11 رقم في مصر)
    if (formData.studentPhone.length < 10 || formData.parentPhone.length < 10)
      return 'يرجى إدخال رقم هاتف صحيح.';

    // 3. البريد الإلكتروني موجود مسبقاً؟
    if (usersDb.some((u) => u.email === formData.email)) return 'هذا البريد الإلكتروني مسجل مسبقاً.';

    // 4. تطابق كلمة المرور
    if (formData.password.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
    if (formData.password !== formData.confirmPassword) return 'كلمتا المرور غير متطابقتين.';

    return null; // لا توجد أخطاء
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // إنشاء المستخدم الجديد
    const newUser = {
      ...formData,
      id: Date.now().toString(),
      studentCode: generateCode(), // توليد الكود العشوائي 4 أرقام
      joinDate: new Date().toLocaleDateString('ar-EG'),
    };

    onRegister(newUser);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white text-center relative">
          <button
            onClick={() => onNavigate('login')}
            className="absolute top-6 left-6 text-teal-100 hover:text-white transition-colors"
          >
            العودة للدخول
          </button>
          <div className="flex justify-center mb-2">
            <GraduationCap size={40} />
          </div>
          <h2 className="text-3xl font-bold">تسجيل طالب جديد</h2>
          <p className="text-teal-100 mt-2">انضم الآن لعائلة Chema واكتشف متعة الكيمياء</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-3">
              <AlertCircle size={24} className="flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* البيانات الشخصية */}
            <div className="space-y-4 md:col-span-2 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                <User size={18} className="text-teal-600" /> البيانات الأساسية
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الطالب (ثلاثي) *</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="مثال: أحمد محمد محمود"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">النوع *</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="text-teal-600 focus:ring-teal-500 w-4 h-4"
                      />
                      <span>ذكر</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="text-teal-600 focus:ring-teal-500 w-4 h-4"
                      />
                      <span>أنثى</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* التواصل والمكان */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Phone size={18} className="text-teal-600" /> بيانات التواصل
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم هاتف الطالب *</label>
                <input
                  required
                  type="tel"
                  name="studentPhone"
                  value={formData.studentPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم هاتف ولي الأمر *</label>
                <input
                  required
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                />
                <p className="text-xs text-gray-500 mt-1">يجب أن يختلف عن رقم الطالب.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <MapPin size={16} />
                  </div>
                  <select
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                  >
                    {GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* الدراسة والأمان */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                <BookOpen size={18} className="text-teal-600" /> بيانات الدراسة والأمان
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الصف الدراسي *</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  {GRADES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نظام الدراسة *</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <label
                    className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      formData.learningMode === 'center'
                        ? 'border-teal-600 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="learningMode"
                      value="center"
                      checked={formData.learningMode === 'center'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Building size={24} className="mb-1" />
                    <span className="font-medium text-sm">سنتر (مقر)</span>
                  </label>
                  <label
                    className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      formData.learningMode === 'online'
                        ? 'border-teal-600 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="learningMode"
                      value="online"
                      checked={formData.learningMode === 'online'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Video size={24} className="mb-1" />
                    <span className="font-medium text-sm">أونلاين</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور *</label>
                  <input
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد المرور *</label>
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/30 text-lg flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                إنشاء الحساب وبدء الرحلة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. لوحة تحكم الطالب (المنصة من الداخل)
// ==========================================
function Dashboard({ user, onLogout }) {
  const gradeName = GRADES.find((g) => g.id === user.grade)?.name;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* القائمة الجانبية (Sidebar) - مختفية في الموبايل */}
      <aside className="w-64 bg-white border-l border-gray-200 hidden md:flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-2 rounded-xl text-white shadow-md">
            <Beaker size={24} />
          </div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Chema</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem icon={<BookOpen />} text="المنهج الدراسي" active />
          <NavItem icon={<PlayCircle />} text="المحاضرات" />
          <NavItem icon={<FileText />} text="الواجبات" />
          <NavItem icon={<Award />} text="الامتحانات" />
          <NavItem icon={<Calendar />} text="الجدول" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full p-3 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            تسجيل خروج
          </button>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* شريط علوي للموبايل والملف الشخصي */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-10">
          <div className="md:hidden flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg text-white">
              <Beaker size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Chema</h1>
          </div>

          <div className="hidden md:block text-gray-500 font-medium">مرحباً بك في منصة الكيمياء الأولى</div>

          <div className="flex items-center gap-3 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-200">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
              {user.fullName.charAt(0)}
            </div>
            <div className="text-sm font-medium text-gray-700 hidden sm:block">{user.fullName.split(' ')[0]}</div>
          </div>
        </header>

        {/* منطقة المحتوى القابلة للتمرير */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* بطاقة الترحيب والكود */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-500 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
              {/* زخرفة خلفية */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">أهلاً يا بطل، {user.fullName.split(' ')[0]}! 👋</h2>
                  <p className="text-teal-50 flex items-center gap-2 text-lg">
                    <GraduationCap size={20} />
                    {gradeName} | مسار: {user.learningMode === 'online' ? 'أونلاين' : 'مقر (سنتر)'}
                  </p>
                </div>

                {/* كود الطالب (أهم عنصر) */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border border-white/30 shadow-inner min-w-[150px]">
                  <p className="text-teal-50 text-sm font-medium mb-1">كود الطالب الخاص بك</p>
                  <p className="text-4xl font-black tracking-widest font-mono">{user.studentCode}</p>
                </div>
              </div>
            </div>

            {/* إشعار مهم حسب نوع الدراسة */}
            <div
              className={`rounded-2xl p-4 flex items-start gap-4 border ${
                user.learningMode === 'center'
                  ? 'bg-orange-50 border-orange-200 text-orange-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="mt-1">{user.learningMode === 'center' ? <Building size={24} /> : <Video size={24} />}</div>
              <div>
                <h3 className="font-bold mb-1">
                  {user.learningMode === 'center' ? 'تذكير موعد السنتر' : 'تذكير حصة الأونلاين'}
                </h3>
                <p className="text-sm opacity-90">
                  {user.learningMode === 'center'
                    ? 'الحصة القادمة في السنتر ستكون يوم الأربعاء القادم الساعة 4 عصراً، يرجى إحضار كود الطالب الخاص بك (أو البطاقة المطبوعة).'
                    : 'محاضرة البث المباشر (Zoom) القادمة ستبدأ يوم الخميس الساعة 7 مساءً. سيظهر رابط الدخول هنا قبل الموعد بـ 15 دقيقة.'}
                </p>
              </div>
            </div>

            {/* شبكة الأقسام */}
            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">الوصول السريع</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="المحاضرة الحالية"
                desc="الباب الأول - التركيب الذري (الدرس الثاني)"
                icon={<PlayCircle size={32} />}
                color="bg-purple-100 text-purple-600"
                btnText="إكمال المشاهدة"
              />

              <DashboardCard
                title="واجب الأسبوع"
                desc="أسئلة وتدريبات على أعداد الكم وقواعد التوزيع."
                icon={<FileText size={32} />}
                color="bg-amber-100 text-amber-600"
                btnText="بدء الحل"
                alert
              />

              <DashboardCard
                title="بنك الأسئلة"
                desc="تدرب على آلاف الأسئلة بالنظام الحديث (اختر و مقالي)."
                icon={<BookOpen size={32} />}
                color="bg-emerald-100 text-emerald-600"
                btnText="تصفح البنك"
              />
            </div>

            <div className="h-8" /> {/* مسافة سفلية */}
          </div>
        </div>
      </main>

      {/* زر تسجيل خروج للموبايل أسفل الشاشة */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-20">
        <button
          onClick={onLogout}
          className="flex justify-center items-center gap-2 text-red-500 bg-red-50 w-full p-3 rounded-xl font-bold"
        >
          <LogOut size={20} />
          خروج
        </button>
      </div>
    </div>
  );
}

// مكون فرعي لعناصر القائمة
function NavItem({ icon, text, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium text-right
      ${active ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'}`}
    >
      <span className={active ? 'text-teal-600' : 'text-gray-400'}>{icon}</span>
      {text}
    </button>
  );
}

// مكون فرعي لبطاقات لوحة التحكم
function DashboardCard({ title, desc, icon, color, btnText, alert }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      {alert && (
        <span className="absolute top-4 left-4 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
      )}
      <div
        className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 h-10">{desc}</p>
      <button className="w-full py-2.5 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors">
        {btnText}
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  FolderTree, 
  Terminal, 
  Code2, 
  Smartphone, 
  Check, 
  Copy, 
  ExternalLink, 
  ChevronRight,
  Layers,
  Sparkles,
  Rocket
} from 'lucide-react';

interface ExpoRouterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'roadmap' | 'files' | 'cheatsheet' | 'concepts';

export const ExpoRouterGuideModal: React.FC<ExpoRouterGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('roadmap');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('app/(tabs)/_layout.tsx');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const fileSnippets: Record<string, { desc: string; code: string; explanation: string }> = {
    'app/_layout.tsx': {
      desc: 'Root Layout - The foundational wrapper for all screens',
      explanation: 'In Expo Router, app/_layout.tsx wraps every route in your application. You use Stack from expo-router here to configure header styling, status bars, and global providers.',
      code: `import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="subscription" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}`,
    },
    'app/(tabs)/_layout.tsx': {
      desc: 'Tab Navigator Layout - Configures the bottom navigation bar',
      explanation: 'The folder name (tabs) in parentheses is a Route Group. It does not add to the URL path. Inside, Tabs from expo-router defines the bottom tabs with custom icons, badges, and labels.',
      code: `import { Tabs } from 'expo-router';
import { LayoutDashboard, ArrowLeftRight, TrendingUp, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#030712',
          borderTopColor: '#1e293b',
          height: 64,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, size }) => <ArrowLeftRight size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}`,
    },
    'app/(tabs)/index.tsx': {
      desc: 'Home Dashboard Screen - First tab destination',
      explanation: 'This is the default index screen when opening (tabs). It renders the personalized greeting, cash flow summary, virtual cards carousel, and recent transactions.',
      code: `import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Good morning, Alex</Text>
      <Text style={styles.netWorth}>$29,660.25</Text>
      
      {/* Quick Navigation Button */}
      <TouchableOpacity 
        style={styles.ctaButton} 
        onPress={() => router.push('/(tabs)/transactions')}
      >
        <Text style={styles.ctaText}>View All Activity</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030712', padding: 16 },
  greeting: { color: '#94a3b8', fontSize: 13 },
  netWorth: { color: '#ffffff', fontSize: 28, fontWeight: 'bold' },
  ctaButton: { backgroundColor: '#38bdf8', padding: 12, borderRadius: 12, marginTop: 16 },
  ctaText: { color: '#030712', fontWeight: 'bold', textAlign: 'center' },
});`,
    },
    'app/onboarding.tsx': {
      desc: 'Onboarding Screen - Welcome & Value Propositions',
      explanation: 'Guides new users through the app features with Get Started and Sign In buttons that navigate via router.replace("/(tabs)").',
      code: `import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-950 p-6 justify-between">
      <Text className="text-2xl font-bold text-white">Master Your Wealth</Text>
      
      <TouchableOpacity
        className="bg-sky-400 py-3 rounded-xl"
        onPress={() => router.push('/subscription')}
      >
        <Text className="text-slate-950 font-bold text-center">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}`,
    },
  };

  const steps = [
    {
      num: '01',
      title: 'Create Your Project with Expo Router',
      ar: 'إنشاء مشروع React Native جديد مع Expo Router',
      desc: 'Run the official Expo CLI command to initialize a modern TypeScript app with file-based routing pre-configured.',
      command: 'npx create-expo-app@latest my-fintech-app -t tabs',
    },
    {
      num: '02',
      title: 'Install Core Mobile Libraries',
      ar: 'تثبيت الحزم الأساسية للأيقونات والحفظ الآمن والواجهات',
      desc: 'Install Lucide icons, AsyncStorage for local offline persistence, and safe-area context.',
      command: 'npx expo install @react-native-async-storage/async-storage react-native-safe-area-context lucide-react-native',
    },
    {
      num: '03',
      title: 'Structure Your File-Based Routes',
      ar: 'تنظيم شاشات التطبيق بنظام المسارات app/',
      desc: 'Create app/_layout.tsx for global Stack and app/(tabs)/_layout.tsx for the bottom bar.',
      command: 'mkdir -p app/(tabs)',
    },
    {
      num: '04',
      title: 'Run with Live Reload on Your Phone',
      ar: 'تشغيل السيرفر وتجربة التطبيق مباشرة على هاتفك بـ Expo Go',
      desc: 'Launch the Metro development server, scan the generated terminal QR code with your phone camera, and enjoy instant fast refresh.',
      command: 'npx expo start',
    },
    {
      num: '05',
      title: 'Build Production Standalone APK / IPA',
      ar: 'توليد ملف APK أو iOS جاهز للنشر بـ EAS Build',
      desc: 'Build installable mobile binaries using Expo Application Services (EAS) without requiring a local Mac Xcode setup.',
      command: 'npx eas-cli build -p android --profile preview',
    },
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col h-[88vh] max-h-[750px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Rocket size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  Expo Router & Build Your First Mobile App
                </h2>
                <span className="text-[10px] bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold px-1.5 py-0.5 rounded font-mono">
                  React Native Guide
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                يا بني، هذا دليلك الكامل لبناء وفهم تطبيقك الأول مع Expo Router خطوة بخطوة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-4 border-b border-slate-800 text-xs font-semibold shrink-0 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'roadmap'
                ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Build Roadmap</span>
            <span className="sm:hidden">Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'files'
                ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree size={14} />
            <span className="hidden sm:inline">Route Anatomy</span>
            <span className="sm:hidden">Routes</span>
          </button>

          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'cheatsheet'
                ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal size={14} />
            <span className="hidden sm:inline">CLI Cheat Sheet</span>
            <span className="sm:hidden">Commands</span>
          </button>

          <button
            onClick={() => setActiveTab('concepts')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'concepts'
                ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Expo Concepts</span>
            <span className="sm:hidden">Concepts</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-4 text-xs text-slate-300">
          {/* TAB 1: ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/30">
                <h3 className="text-sm font-bold text-white mb-1">
                  How This App Was Built from Scratch
                </h3>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Expo Router brings Next.js-like file-based routing to React Native. Every file inside the 
                  <code className="text-sky-400 mx-1 font-mono">app/</code> directory automatically maps to a screen route.
                  Here is the exact progression to build and master this app:
                </p>
              </div>

              <div className="space-y-3">
                {steps.map((st) => (
                  <div 
                    key={st.num}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center text-[10px]">
                          {st.num}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-xs sm:text-sm">{st.title}</h4>
                          <span className="text-[10px] text-slate-400 font-sans">{st.ar}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 mb-2 pl-8.5">
                      {st.desc}
                    </p>

                    <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded-xl border border-slate-800 font-mono text-[11px] text-sky-300 ml-8.5">
                      <code>{st.command}</code>
                      <button
                        onClick={() => copyToClipboard(st.command, st.num)}
                        className="text-slate-400 hover:text-white p-1"
                        title="Copy command"
                      >
                        {copiedCode === st.num ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FILES & ROUTE ANATOMY */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {Object.keys(fileSnippets).map((path) => (
                  <button
                    key={path}
                    onClick={() => setSelectedFile(path)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] whitespace-nowrap transition-all ${
                      selectedFile === path
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {path}
                  </button>
                ))}
              </div>

              {selectedFile && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-xs font-bold text-sky-400 block mb-0.5">
                      {fileSnippets[selectedFile].desc}
                    </span>
                    <p className="text-[11px] text-slate-300">
                      {fileSnippets[selectedFile].explanation}
                    </p>
                  </div>

                  <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-[11px] overflow-x-auto">
                    <button
                      onClick={() => copyToClipboard(fileSnippets[selectedFile].code, selectedFile)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
                    >
                      {copiedCode === selectedFile ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span className="text-[10px]">Copy</span>
                    </button>
                    <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {fileSnippets[selectedFile].code}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CHEAT SHEET */}
          {activeTab === 'cheatsheet' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <h4 className="font-bold text-white text-xs mb-1">Essential Expo Commands</h4>
                <p className="text-[11px] text-slate-400">
                  Save these commands for day-to-day React Native development with Expo CLI:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { label: 'Start Dev Server with Clear Cache', cmd: 'npx expo start -c' },
                  { label: 'Run on Connected Android Phone / Emulator', cmd: 'npx expo run:android' },
                  { label: 'Run on iOS Simulator (macOS)', cmd: 'npx expo run:ios' },
                  { label: 'Run on Web Browser', cmd: 'npx expo start --web' },
                  { label: 'Install Expo-Compatible Package', cmd: 'npx expo install <package-name>' },
                  { label: 'Check Package Compatibility', cmd: 'npx expo-doctor' },
                  { label: 'Generate Splash & App Icons', cmd: 'npx expo-splash-screen' },
                  { label: 'Export Static Production Assets', cmd: 'npx expo export' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{item.label}</span>
                      <code className="text-xs font-mono text-sky-400 font-bold">{item.cmd}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.cmd, `cs-${idx}`)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                    >
                      {copiedCode === `cs-${idx}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONCEPTS & ARABIC SUMMARY */}
          {activeTab === 'concepts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                <h4 className="font-bold text-white text-xs sm:text-sm">
                  ملخص المفاهيم باللغة العربية (Arabic Developer Summary)
                </h4>
                <div className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed font-sans">
                  <p>
                    🔹 <strong>Expo Router:</strong> مكتبة تتيح التنقل المعتمد على الملفات (File-based routing) تماماً كما في Next.js.
                  </p>
                  <p>
                    🔹 <strong>Layouts (`_layout.tsx`):</strong> ملف يغلف المسارات الفرعية، ويسمح بإنشاء شريط تنقل سفلي (`Tabs`) أو انتقال بالـ (`Stack`).
                  </p>
                  <p>
                    🔹 <strong>Route Groups (`(tabs)`):</strong> المجلدات داخل أقواس دائرية تُستخدم لتجميع الشاشات دون التأثير على رابط الصفحة (URL).
                  </p>
                  <p>
                    🔹 <strong>Navigation (`useRouter`):</strong> هوك يتيح لك الانتقال بين الشاشات مثل:
                    <code className="text-sky-400 mx-1">router.push('/subscription')</code> أو <code className="text-sky-400 mx-1">router.replace('/(tabs)')</code>.
                  </p>
                  <p>
                    🔹 <strong>Expo Go:</strong> تطبيق مجاني تفتحه على هاتفك الحقيقي (iPhone أو Android) لمشاهدة واختبار التطبيق مباشرة بمجرد مسح رمز QR من الشاشة.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-xs">Production Readiness Checklist</h4>
                <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                  <li>Safe Area Insets applied for notch and island compatibility (react-native-safe-area-context)</li>
                  <li>Touch hitboxes maintained at least 44x44px for thumb comfort</li>
                  <li>AsyncStorage configured for offline persistence across app relaunches</li>
                  <li>Dark Navy & Obsidian aesthetic with high contrast for outdoor sunlight legibility</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400">
            Aura Wealth · React Native & Expo Router Project
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
          >
            Back to App
          </button>
        </div>
      </div>
    </div>
  );
};

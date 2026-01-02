import React, { useState, useEffect, useCallback, useRef } from 'react';
import Chart from 'chart.js/auto';
import { 
	Download, Play, Link, TreePine, Users, WifiOff, Tag, Link2Off, GraduationCap, 
	UserRoundCog, Plane, Leaf, Landmark, Code, UserCheck, Database, Sprout, 
	ListChecks, HeartHandshake, PiggyBank, ShieldCheck, Smartphone, Music, Waves, 
	Wind, Drum, HandPlatter, BadgeDollarSign, Globe, Megaphone, Maximize, 
	Home, Handshake, Crown, Briefcase, Calculator, Trees, Users2, Scale, 
	CheckCircle2, UserCog, X, Menu, MapPin, Camera
} from 'lucide-react';

// --- Global Color Definitions ---
const styles = {
	'--color-aur-primary': '#2F855A', 
	'--color-aur-secondary': '#C05621', 
	'--color-aur-accent': '#D69E2E', 
	'--color-aur-text': '#2D3748', 
	'--color-aur-muted': '#4A5568', 
	'--color-aur-bg': '#F9F5F0', 
	'--color-aur-light': '#FEFBEF', 
};

// Utility component for Lucide Icons
const Icon = ({ name, className, size = 24 }) => {
	const LucideIcon = {
		Download, Play, Link, TreePine, Users, WifiOff, Tag, Link2Off, GraduationCap, 
		UserRoundCog, Plane, Leaf, Landmark, Code, UserCheck, Database, Sprout, 
		ListChecks, HeartHandshake, PiggyBank, ShieldCheck, Smartphone, Music, Waves, 
		Wind, Drum, HandPlatter, BadgeDollarSign, Globe, Megaphone, Maximize, 
		Home, Handshake, Crown, Briefcase, Calculator, Trees, Users2, Scale, 
		CheckCircle2, UserCog, X, Menu, MapPin, Camera
	}[name] || (() => null);	
	return <LucideIcon className={className} size={size} />;
};

const App = () => {
	// Refs
	const contextRef = useRef(null);
	const solutionRef = useRef(null);
	const innovationRef = useRef(null);
	const businessModelRef = useRef(null);
	const impactRef = useRef(null);
	const roadmapRef = useRef(null);
	const commitmentRef = useRef(null);
	const governanceRef = useRef(null);

	// State
	const [activeTab, setActiveTab] = useState('header'); 
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [linkInput, setLinkInput] = useState('');
	const [toastMessage, setToastMessage] = useState('');
	const [showToast, setShowToast] = useState(false);
	
	// Internal State
	const [activeSolutionTab, setActiveSolutionTab] = useState('TAF');	

	// Image Upload States
	const [headerImage, setHeaderImage] = useState(null); 
	const [solutionImage, setSolutionImage] = useState(null);
	const [financeImage, setFinanceImage] = useState(null);
	
	// Sound Branding State
	const [soundBrandingUrl, setSoundBrandingUrl] = useState('');

	// Chart Refs
	const budgetChartRef = useRef(null);
	const impactChartRef = useRef(null);
	const profitShareChartRef = useRef(null);
	const chartInstances = useRef({});

	// TAB MAP
	const TAB_MAP = {
		header: 'Trang Chủ',
		context: 'Bối Cảnh',
		solution: 'Giải Pháp',
		innovation: 'Đổi Mới',
		'business-model': 'Doanh Thu',
		impact: 'Tài Chính',
		roadmap: 'Lộ Trình',
		commitment: 'SDGs',
		governance: 'Quản trị ESG',
	};
	
	const showToastNotification = useCallback((message) => {
		setToastMessage(message);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	}, []);

	// Download Page Function
	const downloadPage = useCallback(() => {
		const rootContent = document.querySelector('.min-h-screen');
		if (!rootContent) {
			showToastNotification("Không tìm thấy nội dung trang để tải về.");
			return;
		}

		const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Lang Aur - Pitch Deck ESG</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	<style>
		:root {
			--color-aur-primary: #2F855A;
			--color-aur-secondary: #C05621;
			--color-aur-accent: #D69E2E;
			--color-aur-text: #2D3748;
			--color-aur-muted: #4A5568;
			--color-aur-bg: #F9F5F0;
			--color-aur-light: #FEFBEF;
		}
		body { font-family: 'Inter', sans-serif; background-color: var(--color-aur-bg); color: var(--color-aur-text); margin-top: 0 !important; }
		.revenue-table td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
		.revenue-table tr:hover { background-color: #f3f4f6; }
		.revenue-amount { text-align: right; font-weight: bold; color: var(--color-aur-primary); }
		.connector-line { position: absolute; left: 50%; top: 0; height: 100%; width: 4px; background-color: #d1d5db; transform: translateX(-50%); }
		.fixed-nav, .fixed-toast, .fixed-modal, nav, #customToast, #linkModal, .header-upload-btn, .link-btn-hidden { display: none !important; }
		.upload-placeholder { border: 2px dashed #9ca3af; border-radius: 12px; background-color: #f9f9f9; padding: 20px; text-align: center; min-height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
		.chart-container { height: 320px !important; }
		.tab-content { display: block !important; margin-bottom: 50px; border-bottom: 2px dashed #ccc; padding-bottom: 20px; }
	</style>
</head>
<body>
	<div id="download-content-root">
		<!-- Snapshot Content -->
	</div>
	<script>
		const snapshot = \`${rootContent.innerHTML.replace(/`/g, '\\`')}\`;
		const container = document.getElementById('download-content-root');
		container.innerHTML = snapshot;
		const nav = container.querySelector('nav');
		if (nav) nav.remove();
		const toast = container.querySelector('#customToast');
		if (toast) toast.remove();
		const modal = container.querySelector('#linkModal');
		if (modal) modal.remove();
		container.querySelectorAll('canvas').forEach(canvas => {
			const chartParent = canvas.parentElement;
			if(chartParent) {
				const message = document.createElement('p');
				message.innerText = 'BIỂU ĐỒ (CHART.JS) KHÔNG KHẢ DỤNG TRONG FILE TĨNH.';
				message.style.cssText = 'color: red; padding: 20px; text-align: center; border: 1px dashed red; font-weight: bold; margin: 20px 0;';
				chartParent.replaceChild(message, canvas);
			}
		});
		container.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));
	</script>
</body>
</html>`;

		const blob = new Blob([htmlContent], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'LangAur_PitchDeck.html';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		showToastNotification("Đã tải file HTML.");
	}, [showToastNotification]);

	// Switch Tab Function
	const handleSwitchTab = useCallback((id) => {
		setActiveTab(id);
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setIsMenuOpen(false);
	}, []);

	const previewImage = (event, setImage) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => setImage(e.target.result);
			reader.readAsDataURL(file);
		}
	};

	// Sound Link Logic
	const setSoundLink = useCallback(() => {
		setLinkInput(soundBrandingUrl);
		setIsModalOpen(true);
	}, [soundBrandingUrl]);

	const saveLink = () => {
		let url = linkInput.trim();
		if (url) {
			if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
			try { localStorage.setItem('soundBrandingUrl', url); } catch(e) {}
			setSoundBrandingUrl(url);
			setIsModalOpen(false);
			showToastNotification("Đã lưu link!");
		} else {
			showToastNotification("Link không hợp lệ.");
		}
	};

	const checkSoundLink = (event) => {
		if (!soundBrandingUrl) {
			event.preventDefault(); 
			setSoundLink(); 
		}
	};

	// Chart Init
	const initCharts = useCallback(() => {
		Chart.defaults.font.family = "'Noto Sans', sans-serif";
		Object.values(chartInstances.current).forEach(chart => chart.destroy());
		chartInstances.current = {};

		if (budgetChartRef.current) {
			chartInstances.current.budget = new Chart(budgetChartRef.current.getContext('2d'), {
				type: 'doughnut',
				data: {
					labels: ['Tự đầu tư (54%)', 'Bên thứ 3 (29%)', 'Đề nghị ST4SD (17%)'],
					datasets: [{ 
						data: [560, 300, 180], 
						backgroundColor: [
							styles['--color-aur-primary'], // Tự đầu tư
							'#4299E1',                      // Bên thứ 3
							styles['--color-aur-secondary'] // ST4SD đề nghị
						], 
						borderWidth: 0 
					}]
				},
				options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
			});
		}
		if (impactChartRef.current) {
			chartInstances.current.impact = new Chart(impactChartRef.current.getContext('2d'), {
				type: 'bar',
				data: {
					labels: ['Khách', 'Hộ Dân', 'Storytellers'],
					datasets: [{ label: 'Mục Tiêu', data: [100, 20, 10], backgroundColor: ['#4299E1', '#48BB78', '#ECC94B'] }]
				},
				options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
			});
		}
		if (profitShareChartRef.current) {
			chartInstances.current.profit = new Chart(profitShareChartRef.current.getContext('2d'), {
				type: 'pie',
				data: {
					labels: ['Cộng Đồng (65%)', 'Quỹ Bảo Tồn (15%)', 'Quỹ HTX (15%)', 'Vận Hành (5%)'],
					datasets: [{
						data: [65, 15, 15, 5],
						backgroundColor: ['#48BB78', '#4299E1', '#ECC94B', '#A0AEC0'],
						borderWidth: 0
					}]
				},
				options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
			});
		}
	}, []);

	useEffect(() => {
		window.downloadPage = downloadPage;
		initCharts();
		try {
			const savedLink = localStorage.getItem('soundBrandingUrl');
			if (savedLink) setSoundBrandingUrl(savedLink);
		} catch(e) {}

		return () => {
			 if (window.downloadPage === downloadPage) delete window.downloadPage;
			 Object.values(chartInstances.current).forEach(chart => chart.destroy());
		};
	}, [downloadPage, initCharts]);

	// --- RENDER SECTIONS ---

	const renderGovernanceSection = (ref) => (
		<div ref={ref} className="bg-[var(--color-aur-bg)] py-16 px-4">
			<div className="max-w-7xl mx-auto">
				{/* HEADER */}
				<header className="text-center mb-12">
					<h2 className="text-4xl md:text-6xl font-black text-[var(--color-aur-secondary)] mb-3 uppercase tracking-tight">HTX Du Lịch & Văn Hoá Cơ Tu Trường Sơn</h2> 
					<h3 className="text-xl md:text-3xl font-bold text-[var(--color-aur-primary)]">Sơ Đồ Tổ chức Theo Mô Hình ESG</h3>
					<div className="w-24 h-1 bg-[var(--color-aur-secondary)] mx-auto mt-4 rounded"></div>
				</header>

				{/* LEVEL 1: ĐẠI HỘI THÀNH VIÊN */}
				<section className="mb-16 relative flex flex-col items-center">
					<div className="bg-gradient-to-r from-[var(--color-aur-secondary)] to-orange-800 text-white rounded-xl shadow-xl p-6 w-full max-w-3xl text-center relative z-10">
						<div className="flex justify-center mb-3">
							<Icon name="Users" className="w-10 h-10" />
						</div>
						<h4 className="text-2xl font-bold uppercase mb-2">Đại Hội Thành Viên (AOM)</h4>
						<p className="text-base text-orange-100">Cơ quan quyền lực cao nhất</p>
						<div className="mt-4 flex flex-wrap justify-center gap-4 text-base font-medium">
							<span className="bg-white/20 px-3 py-1 rounded-full">20 Hộ nông dân</span>
							<span className="bg-white/20 px-3 py-1 rounded-full">06 Cổ đông sáng lập</span>
						</div>
					</div>
					<div className="h-12 w-0.5 bg-gray-400"></div>
				</section>

				{/* LEVEL 2: HỘI ĐỒNG QUẢN TRỊ */}
				<section className="mb-16 relative">
					<div className="text-center mb-6">
						<div className="inline-block bg-white border-2 border-[var(--color-aur-secondary)] text-[var(--color-aur-secondary)] px-6 py-2 rounded-lg font-bold shadow-md uppercase z-20 relative text-lg">
							Hội Đồng Quản Trị (ESG Strategic Board)
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
						{/* Nguyễn Văn Nhân */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-[var(--color-aur-accent)] shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">Nguyễn Văn Nhân</h4><p className="text-sm font-semibold text-[var(--color-aur-accent)] uppercase">Chủ tịch HĐQT</p></div>
								<Icon name="Crown" className="text-[var(--color-aur-accent)] w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">Chuyên gia nông nghiệp bền vững & ESG</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Chiến lược ESG</span>
								<span className="block">• Phát triển bền vững</span>
							</div>
						</div>

						{/* Hòa Thị Kim Ngân */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-blue-500 shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">Hòa Thị Kim Ngân</h4><p className="text-sm font-semibold text-blue-600 uppercase">Giám Đốc HTX</p></div>
								<Icon name="Briefcase" className="text-blue-500 w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">Chuyên môn xã hội học & marketing truyền thông</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Điều hành tổng thể</span>
								<span className="block">• Chính sách xã hội</span>
							</div>
						</div>

						{/* Nguyễn Tấn Châu */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-cyan-500 shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">Nguyễn Tấn Châu</h4><p className="text-sm font-semibold text-cyan-600 uppercase">Ủy viên HĐQT</p></div>
								<Icon name="Megaphone" className="text-cyan-500 w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">Trên 15 năm làm truyền hình, phóng sự</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Nhân sự & Đối ngoại</span>
								<span className="block">• Truyền thông đa kênh</span>
							</div>
						</div>

						{/* Đỗ Đại Nghĩa */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-purple-500 shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">Đỗ Đại Nghĩa</h4><p className="text-sm font-semibold text-purple-600 uppercase">Ủy viên HĐQT</p></div>
								<Icon name="Calculator" className="text-purple-500 w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">Trên 15 năm làm công tác thiện nguyện</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Quản trị ESG</span>
								<span className="block">• Thị trường nông sản</span>
							</div>
						</div>

						{/* A Lăng Phích */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-[var(--color-aur-primary)] shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">A Lăng Phích</h4><p className="text-sm font-semibold text-[var(--color-aur-primary)] uppercase">Ủy viên HĐQT</p></div>
								<Icon name="Trees" className="text-[var(--color-aur-primary)] w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">30 năm sinh sống tại địa phương, cán bộ thôn</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Quản lý làng & Rừng</span>
								<span className="block">• Điều phối cộng đồng</span>
							</div>
						</div>

						{/* A Lăng Thị Mái */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-rose-500 shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">A Lăng Thị Mái</h4><p className="text-sm font-semibold text-rose-600 uppercase">Ủy viên HĐQT</p></div>
								<Icon name="HeartHandshake" className="text-rose-500 w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">30 năm sinh sống, 3 năm kinh nghiệm du lịch</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Quản lý dịch vụ</span>
								<span className="block">• Chăm sóc khách hàng</span>
							</div>
						</div>

						{/* Võ Tấn Tân (MỚI) */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-orange-500 shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">Võ Tấn Tân</h4><p className="text-sm font-semibold text-orange-600 uppercase">Ủy viên HĐQT</p></div>
								<Icon name="Leaf" className="text-orange-500 w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">Nghệ nhân thủ công mỹ nghệ tiêu biểu toàn quốc</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Thủ công mỹ nghệ</span>
								<span className="block">• Kết hợp du lịch & Đối ngoại</span>
							</div>
						</div>

						{/* Đặng Thị Diễm (MỚI) */}
						<div className="bg-white p-5 rounded-lg border-l-4 border-gray-500 shadow-md hover:shadow-lg">
							<div className="flex justify-between">
								<div><h4 className="font-bold text-lg">Đặng Thị Diễm</h4><p className="text-sm font-semibold text-gray-600 uppercase">Ủy viên HĐQT</p></div>
								<Icon name="Scale" className="text-gray-500 w-6 h-6" />
							</div>
							<p className="text-sm text-gray-500 mt-2 italic border-b pb-2 mb-2">Kế toán hành chính</p>
							<div className="text-sm text-gray-700">
								<span className="block">• Kế toán tổng hợp</span>
								<span className="block">• Quản trị hành chính</span>
							</div>
						</div>
					</div>
					<div className="absolute left-1/2 bottom-0 w-0.5 h-8 bg-gray-400 transform -translate-x-1/2 translate-y-full"></div>
				</section>

				{/* LEVEL 3: BAN ĐIỀU HÀNH */}
				<section className="mb-12 flex justify-center">
					<div className="bg-blue-900 text-white px-8 py-4 rounded-xl shadow-xl flex items-center gap-4 border-2 border-blue-700 z-10">
						<div className="bg-blue-700 p-2 rounded-full">
							<Icon name="UserCog" className="w-6 h-6" />
						</div>
						<div className="text-left">
							<p className="text-base text-blue-200 uppercase tracking-wider">Ban Điều Hành</p>
							<h4 className="text-xl font-bold">Giám Đốc: Hòa Thị Kim Ngân</h4>
						</div>
					</div>
				</section>

				{/* LEVEL 4: ESG UNITS */}
				<section className="mb-16">
					<h4 className="text-center text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
						<span className="text-[var(--color-aur-primary)]">E</span>-
						<span className="text-[var(--color-aur-secondary)]">S</span>-
						<span className="text-blue-600">G</span> Structure
					</h4>
					
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{/* Environment Unit */}
						<div className="flex flex-col h-full">
							<div className="bg-green-50 border-t-8 border-[var(--color-aur-primary)] rounded-lg shadow-lg p-6 flex-1 hover:bg-green-100 transition-colors">
								<div className="flex items-center gap-3 mb-4">
									<div className="bg-[var(--color-aur-primary)] text-white p-2 rounded-lg"><Icon name="Leaf" className="w-6 h-6" /></div>
									<div>
										<h5 className="text-xl font-bold text-green-900">Environment Unit</h5>
										<p className="text-sm font-medium text-[var(--color-aur-primary)] mt-1">
											Phụ trách: <br/> 
											<span className="font-bold">A Lăng Phích, A Lăng Thị Mái</span>
										</p>
									</div>
								</div>
								<ul className="space-y-3 text-base text-gray-700">
									<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-[var(--color-aur-primary)] mt-1" /><span>Quản lý 1000ha rừng cộng đồng + 200ha rừng sản xuất.</span></li>
									<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-[var(--color-aur-primary)] mt-1" /><span>Quản lý tài nguyên bản địa (Nước, Đất, Thảo dược).</span></li>
									<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-[var(--color-aur-primary)] mt-1" /><span>Kiểm soát tác động môi trường du lịch.</span></li>
								</ul>
							</div>
						</div>
						{/* Social Unit */}
						<div className="flex flex-col h-full">
							<div className="bg-orange-50 border-t-8 border-[var(--color-aur-secondary)] rounded-lg shadow-lg p-6 flex-1 hover:bg-orange-100 transition-colors">
								<div className="flex items-center gap-3 mb-4">
									<div className="bg-[var(--color-aur-secondary)] text-white p-2 rounded-lg"><Icon name="Users2" className="w-6 h-6" /></div>
									<div>
										<h5 className="text-xl font-bold text-orange-900">Social Unit</h5>
										<p className="text-sm font-medium text-[var(--color-aur-secondary)] mt-1">
											Phụ trách: <br/> 
											<span className="font-bold">Nguyễn Tấn Châu, Võ Tấn Tân, Hoà Thị Kim Ngân</span>
										</p>
									</div>
								</div>
								<div className="space-y-4">
									<div>
										<h6 className="text-sm font-bold text-orange-800 uppercase mb-1">Du lịch & Văn hóa</h6>
										<ul className="space-y-2 text-base text-gray-700">
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-[var(--color-aur-secondary)] mt-1" /><span>Indigenous Storytellers & Forest Sound Branding.</span></li>
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-[var(--color-aur-secondary)] mt-1" /><span>Thiết lập "Ranh giới văn hóa".</span></li>
										</ul>
									</div>
									<div className="border-t border-orange-200 pt-2">
										<h6 className="text-sm font-bold text-orange-800 uppercase mb-1">Customer Care</h6>
										<ul className="space-y-2 text-base text-gray-700">
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-[var(--color-aur-secondary)] mt-1" /><span>Quản lý lưu trú & Tiêu chuẩn dịch vụ.</span></li>
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-[var(--color-aur-secondary)] mt-1" /><span>Đào tạo nghiệp vụ cộng đồng.</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						{/* Governance Unit */}
						<div className="flex flex-col h-full">
							<div className="bg-blue-50 border-t-8 border-blue-600 rounded-lg shadow-lg p-6 flex-1 hover:bg-blue-100 transition-colors">
								<div className="flex items-center gap-3 mb-4">
									<div className="bg-blue-600 text-white p-2 rounded-lg"><Icon name="Scale" className="w-6 h-6" /></div>
									<div>
										<h5 className="text-xl font-bold text-blue-900">Governance Unit</h5>
										<p className="text-sm font-medium text-blue-700 mt-1">
											Phụ trách: <br/> 
											<span className="font-bold">Nguyễn Văn Nhân, Đỗ Đại Nghĩa, Đặng Thị Diễm</span>
										</p>
									</div>
								</div>
								<div className="space-y-4">
									<div>
										<h6 className="text-sm font-bold text-blue-800 uppercase mb-1">Finance Unit</h6>
										<ul className="space-y-2 text-base text-gray-700">
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-blue-600 mt-1" /><span>Minh bạch tài chính chuẩn ESG.</span></li>
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-blue-600 mt-1" /><span>Quản lý quỹ bảo tồn & quỹ cộng đồng.</span></li>
										</ul>
									</div>
									<div className="border-t border-blue-200 pt-2">
										<h6 className="text-sm font-bold text-blue-800 uppercase mb-1">HR & Communications</h6>
										<ul className="space-y-2 text-base text-gray-700">
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-blue-600 mt-1" /><span>Quan hệ đối tác ESG (NGO, Chính quyền).</span></li>
											<li className="flex items-start gap-2"><Icon name="CheckCircle2" className="w-4 h-4 text-blue-600 mt-1" /><span>Công bố báo cáo ESG thường niên.</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* LEVEL 5: FOUNDATION & PARTNERS */}
				<section className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					<div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
						<div className="flex items-start gap-4 mb-4">
							<div className="bg-gray-700 p-3 rounded-full flex-shrink-0"><Icon name="Home" className="w-8 h-8" /></div>
							<div>
								<h4 className="text-xl font-bold uppercase mb-1">Khối Thành Viên</h4>
								<p className="text-gray-300 text-base">21 Hộ nông dân nòng cốt</p>
							</div>
						</div>
						<div className="text-sm text-gray-400 flex flex-wrap gap-2">
							<span className="bg-gray-700 px-2 py-1 rounded">Nông lâm sản</span>
							<span className="bg-gray-700 px-2 py-1 rounded">Homestay</span>
							<span className="bg-gray-700 px-2 py-1 rounded">Trekking</span>
						</div>
					</div>
					<div className="lg:col-span-2 bg-white border-2 border-dashed border-gray-300 p-6 rounded-xl shadow-sm">
						<h4 className="text-xl font-bold text-gray-800 uppercase mb-4 flex items-center gap-2">
							<Icon name="Handshake" className="w-5 h-5 text-gray-600" /> Đối Tác Chiến Lược
						</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="bg-gray-50 p-3 rounded border border-gray-200">
								<span className="block font-bold text-[var(--color-aur-secondary)] text-base">EMIC GROUP</span>
								<span className="text-sm text-gray-500">Đối tác lữ hành ESG cao cấp</span>
							</div>
							<div className="bg-gray-50 p-3 rounded border border-gray-200">
								<span className="block font-bold text-[var(--color-aur-primary)] text-base">HTX HAPPY VITA</span>
								<span className="text-sm text-gray-500">Đối tác nông sản hữu cơ</span>
							</div>
							<div className="bg-gray-50 p-3 rounded border border-gray-200">
								<span className="block font-bold text-red-700 text-base">UBND XÃ A VƯƠNG</span>
								<span className="text-sm text-gray-500">Chính Quyền & Pháp Lý</span>
							</div>
							<div className="bg-gray-50 p-3 rounded border border-gray-200">
								<span className="block font-bold text-green-700 text-base">BQL RỪNG & KBT SAO LA</span>
								<span className="text-sm text-gray-500">Quản Lý Rừng & Sinh Thái</span>
							</div>
							<div className="bg-gray-50 p-3 rounded border border-gray-200">
								<span className="block font-bold text-red-500 text-base">ST4SD VIETNAM</span>
								<span className="text-sm text-gray-500">Tài Trợ & Phát Triển</span>
							</div>
							<div className="bg-gray-50 p-3 rounded border border-gray-200">
								<span className="block font-bold text-purple-600 text-base">ECUE VN - SEV</span>
								<span className="text-sm text-gray-500">Đào Tạo & Khởi Nghiệp XH</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);

	const renderHeader = () => (
		<header className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[85vh] flex flex-col justify-center items-center">
			<div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
				style={{ backgroundImage: headerImage ? `url('${headerImage}')` : 'none', backgroundColor: !headerImage ? '#2F855A' : 'transparent' }}>
				<div className="absolute inset-0 bg-black/40"></div>
			</div>
			<label htmlFor="upload-header-bg" className="header-upload-btn absolute top-24 right-8 z-30 bg-white/20 hover:bg-white/40 p-3 rounded-full cursor-pointer transition backdrop-blur-md group" title="Tải ảnh nền">
				<Icon name="Camera" className="text-white group-hover:scale-110 transition" size={24} />
				<input type="file" id="upload-header-bg" className="hidden" accept="image/*" onChange={(e) => previewImage(e, setHeaderImage)} />
			</label>
			<div className="container mx-auto text-center relative z-10 max-w-5xl text-white animate-fade-in-up">
				<p className="text-base md:text-xl font-bold tracking-wider uppercase mb-2 text-[var(--color-aur-accent)] drop-shadow-md">Dự án Phát triển Du lịch Bền vững</p>
				<h1 className="text-4xl md:text-6xl font-serif font-black mb-6 leading-tight shadow-sm uppercase tracking-tight">HTX DU LỊCH & VĂN HOÁ <br/> CƠ TU TRƯỜNG SƠN</h1>
				<div className="w-32 h-1 bg-[var(--color-aur-accent)] mx-auto my-6 rounded-full"></div>
				<h2 className="text-xl md:text-3xl font-light mb-2">Dự án Nâng Cao Giá Trị Bền Vững <br/><span className="font-bold mt-2 inline-block text-white">Du Lịch Văn Hóa Bản Địa Cộng Đồng Cơ Tu</span></h2>
				<p className="text-lg md:text-xl mt-4 font-medium opacity-90"><Icon name="MapPin" className="inline-block mr-2" size={20}/> Làng Aur, Tây Giang, Quảng Nam</p>
				<p className="text-lg md:text-2xl mt-6 italic font-serif text-[var(--color-aur-light)] drop-shadow-md">"Nghe để hiểu - Hiểu để chạm - Chạm để trân quý và gìn giữ"</p>
				
				<button onClick={() => handleSwitchTab('context')} className="mt-12 px-8 py-3 bg-[var(--color-aur-accent)] text-white rounded-full font-bold hover:bg-yellow-600 transition shadow-lg animate-bounce">Khám Phá Dự Án</button>
			</div>
		</header>
	);

	const renderContext = (ref) => (
		<section ref={ref} className="py-16 bg-white min-h-[80vh]">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="max-w-4xl mx-auto text-center mb-12">
					<h2 className="text-4xl font-serif font-bold text-[var(--color-aur-text)] mb-4">Bối Cảnh & Thách Thức</h2>
					<p className="text-xl text-gray-600 leading-relaxed">
						Làng Aur, nằm giữa lõi khu bảo tồn Sao La, được mệnh danh là "Làng Singapore" giữa rừng già. 
						Tuy nhiên, dù sở hữu tài nguyên văn hóa và sinh thái 1.000 ha rừng, ngôi làng vẫn "vô hình" trên bản đồ số, dẫn đến giá trị nông sản bị định giá thấp.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div className="p-6 bg-[var(--color-aur-bg)] rounded-xl border-l-4 border-[var(--color-aur-primary)] shadow-sm hover:shadow-md transition">
						<Icon name="TreePine" className="text-[var(--color-aur-primary)] mb-2" size={40} />
						<h3 className="text-2xl font-bold mb-2">1,000 ha</h3>
						<p className="text-base text-gray-600">Rừng cộng đồng & Khu bảo tồn Sao La.</p>
					</div>
					<div className="p-6 bg-[var(--color-aur-bg)] rounded-xl border-l-4 border-[var(--color-aur-secondary)] shadow-sm hover:shadow-md transition">
						<Icon name="Users" className="text-[var(--color-aur-secondary)] mb-2" size={40} />
						<h3 className="text-2xl font-bold mb-2">21 Hộ</h3>
						<p className="text-base text-gray-600">100% Đồng bào Cơ Tu giữ gìn văn hóa nguyên bản.</p>
					</div>
					<div className="p-6 bg-[var(--color-aur-bg)] rounded-xl border-l-4 border-gray-400 shadow-sm hover:shadow-md transition">
						<Icon name="WifiOff" className="text-gray-400 mb-2" size={40} />
						<h3 className="text-2xl font-bold mb-2">Vô Hình Số</h3>
						<p className="text-base text-gray-600">Thiếu năng lực truyền thông & Storytelling.</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					<div className="bg-white border border-gray-200 rounded-lg p-6 relative overflow-hidden group hover:border-[var(--color-aur-secondary)] hover:bg-orange-50 transition">
						<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><Icon name="Tag" size={64} className="text-red-500" /></div>
						<h4 className="text-xl font-bold text-red-600 mb-3">1. Giá Trị Bị Định Giá Thấp</h4>
						<p className="text-base text-gray-600">Bà con chỉ bán "nguyên liệu thô" thay vì "trải nghiệm". Thiếu câu chuyện thương hiệu.</p>
					</div>
					<div className="bg-white border border-gray-200 rounded-lg p-6 relative overflow-hidden group hover:border-[var(--color-aur-secondary)] hover:bg-orange-50 transition">
						<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><Icon name="Link2Off" size={64} className="text-red-500" /></div>
						<h4 className="text-xl font-bold text-red-600 mb-3">2. Đứt Gãy Chuỗi Giá Trị</h4>
						<p className="text-base text-gray-600">Thiếu HTX đủ năng lực kết nối với thị trường khách High-end.</p>
					</div>
					<div className="bg-white border border-gray-200 rounded-lg p-6 relative overflow-hidden group hover:border-[var(--color-aur-secondary)] hover:bg-orange-50 transition">
						<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><Icon name="GraduationCap" size={64} className="text-red-500" /></div>
						<h4 className="text-xl font-bold text-red-600 mb-3">3. Khoảng Trống Năng Lực</h4>
						<p className="text-base text-gray-600">Nguy cơ phát triển tự phát, thiếu kiểm soát nếu không được đào tạo.</p>
					</div>
				</div>

				{/* Team & Partners */}
				<div className="bg-gray-50 rounded-2xl p-8 mt-8">
					<h3 className="text-center font-bold text-gray-500 uppercase tracking-widest mb-8 text-base">Hệ Sinh Thái Đối Tác Chiến Lược</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
						<div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
							<div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="Plane" size={24} /></div>
							<h4 className="font-bold text-[var(--color-aur-text)] mb-1 text-lg">Emic Group</h4>
							<span className="text-base font-bold text-blue-600 uppercase block mb-3">Đối tác Du Lịch</span>
							<p className="text-sm text-gray-600 leading-relaxed">Hỗ trợ kết nối thị trường, xây dựng sản phẩm tour, đào tạo kỹ năng đón tiếp khách du lịch chuyên nghiệp.</p>
						</div>
						<div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
							<div className="w-12 h-12 bg-[var(--color-aur-accent)] text-white rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="Leaf" size={24} /></div>
							<h4 className="font-bold text-[var(--color-aur-text)] mb-1 text-lg">HTX Happy Vita</h4>
							<span className="text-base font-bold text-[var(--color-aur-accent)] uppercase block mb-3">Đối tác Nông Sản</span>
							<p className="text-sm text-gray-600 leading-relaxed">Hỗ trợ kỹ thuật canh tác, bao tiêu nông sản (Mật ong, Đẳng sâm) và quy trình chế biến sâu.</p>
						</div>
						<div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
							<div className="w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="Landmark" size={24} /></div>
							<h4 className="font-bold text-[var(--color-aur-text)] mb-1 text-lg">UBND Xã A Vương</h4>
							<span className="text-base font-bold text-red-700 uppercase block mb-3">Chính Quyền & Pháp Lý</span>
							<p className="text-sm text-gray-600 leading-relaxed">Hỗ trợ cơ chế chính sách, pháp lý hoạt động và an ninh trật tự tại địa phương.</p>
						</div>
						<div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
							<div className="w-12 h-12 bg-[var(--color-aur-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="Users" size={24} /></div>
							<h4 className="font-bold text-[var(--color-aur-text)] mb-1 text-lg">21 Hộ Bà Con Cơ Tu</h4>
							<span className="text-base font-bold text-[var(--color-aur-primary)] uppercase block mb-3">Chủ Thể & Hưởng Lợi</span>
							<p className="text-sm text-gray-600 leading-relaxed">Cộng đồng làng Aur. Người trực tiếp tham gia dịch vụ, bảo vệ rừng và giữ gìn văn hóa.</p>
						</div>
						
						{/* New Partners */}
						<div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
							<div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="ShieldCheck" size={24} /></div>
							<h4 className="font-bold text-[var(--color-aur-text)] mb-1 text-lg">BQL Rừng & Khu Bảo Tồn Sao La</h4>
							<span className="text-base font-bold text-green-700 uppercase block mb-3">Quản Lý Rừng & Sinh Thái</span>
							<p className="text-sm text-gray-600 leading-relaxed">Hỗ trợ cơ chế chính sách, pháp lý liên quan tới các hoạt động bảo vệ rừng, hệ sinh thái tự nhiên và đa dạng sinh học.</p>
						</div>

						<div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
							<div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="Globe" size={24} /></div>
							<h4 className="font-bold text-[var(--color-aur-text)] mb-1 text-lg">ST4SD Vietnam</h4>
							<span className="text-base font-bold text-red-500 uppercase block mb-3">Tài Trợ & Phát Triển</span>
							<p className="text-sm text-gray-600 leading-relaxed">Hỗ trợ cơ chế chính sách, tài trợ nguồn lực tài chính và con người triển khai thực thi các ý tưởng sáng tạo của dự án.</p>
						</div>

						<div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
							<div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="GraduationCap" size={24} /></div>
							<h4 className="font-bold text-[var(--color-aur-text)] mb-1 text-lg">ECUE Viet Nam - SEV</h4>
							<span className="text-base font-bold text-purple-600 uppercase block mb-3">Đào Tạo & Khởi Nghiệp XH</span>
							<p className="text-sm text-gray-600 leading-relaxed">Hỗ trợ các chương trình đào tạo chuyên sâu về mô hình DNXH và khoản tài trợ nhỏ để triển khai dự án khởi nghiệm XH.</p>
						</div>

					</div>
				</div>
			</div>
		</section>
	);

	const renderSolution = (ref) => (
		<section ref={ref} className="py-16 bg-[var(--color-aur-bg)] min-h-[80vh]">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="max-w-4xl mx-auto text-center mb-10">
					<h2 className="text-4xl font-serif font-bold text-[var(--color-aur-text)] mb-4">Giải Pháp: Hệ Sinh Thái Sinh Kế Kép</h2>
					<p className="text-xl text-gray-600">
						Lấy <strong>Nông nghiệp & Văn hóa làm gốc</strong>, dùng du lịch làm công cụ gia tăng giá trị.
					</p>
				</div>

				<div className="flex justify-center mb-8">
					<div className="bg-gray-100 p-1 rounded-full inline-flex shadow-inner">
						<button onClick={() => setActiveSolutionTab('TAF')} className={`px-6 py-2 rounded-full text-base font-bold transition ${activeSolutionTab === 'TAF' ? 'bg-white shadow-md text-[var(--color-aur-primary)]' : 'text-gray-500 hover:text-[var(--color-aur-primary)]'}`}>Trụ Cột 1: Hỗ Trợ Kỹ Thuật (TAF)</button>
						<button onClick={() => setActiveSolutionTab('CIF')} className={`px-6 py-2 rounded-full text-base font-bold transition ${activeSolutionTab === 'CIF' ? 'bg-white shadow-md text-[var(--color-aur-secondary)]' : 'text-gray-500 hover:text-[var(--color-aur-secondary)]'}`}>Trụ Cột 2: Tác Động Cộng Đồng (CIF)</button>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">	
					<div className="w-full">
						{activeSolutionTab === 'TAF' && (
							<div className="animate-fade-in">
								<h3 className="text-2xl font-bold text-[var(--color-aur-primary)] mb-4"><Icon name="Code" className="mr-2 inline-block" size={24} /> Technical Assistance (TAF)</h3>
								<p className="text-base text-gray-700 mb-6">Nâng cao năng lực "phần mềm", chuyển cộng đồng từ thế bị động sang chủ động.</p>
								<ul className="space-y-4">
									<li className="flex items-start">
										<span className="bg-green-100 text-green-800 p-2 rounded-md mr-3"><Icon name="UserCheck" size={24} /></span>
										<div><h4 className="font-bold text-lg">Chương trình "Indigenous Storytellers"</h4><p className="text-base text-gray-600">Đào tạo 10 người dân bản địa thành Digital Hosts (Quay, dựng, kể chuyện).</p></div>
									</li>
									<li className="flex items-start">
										<span className="bg-green-100 text-green-800 p-2 rounded-md mr-3"><Icon name="Database" size={24} /></span>
										<div><h4 className="font-bold text-lg">Số hóa Di Sản</h4><p className="text-base text-gray-600">Xây dựng kho dữ liệu âm thanh/hình ảnh số về văn hóa Cơ Tu.</p></div>
									</li>
									<li className="flex items-start">
										<span className="bg-green-100 text-green-800 p-2 rounded-md mr-3"><Icon name="Sprout" size={24} /></span>
										<div><h4 className="font-bold text-lg">Nông Nghiệp Thuận Nhiên</h4><p className="text-base text-gray-600">Tích hợp nông nghiệp vườn rừng vào mô hình canh tác thuận nhiên gia tăng sinh kế bền vững.</p></div>
									</li>
									<li className="flex items-start">
										<span className="bg-green-100 text-green-800 p-2 rounded-md mr-3"><Icon name="ListChecks" size={24} /></span>
										<div><h4 className="font-bold text-lg">Chuẩn hóa SOP</h4><p className="text-base text-gray-600">Quy trình đón khách, quy trình an toàn rừng chuẩn quốc tế.</p></div>
									</li>
								</ul>
							</div>
						)}
						{activeSolutionTab === 'CIF' && (
							<div className="animate-fade-in">	
								<h3 className="text-2xl font-bold text-[var(--color-aur-secondary)] mb-4"><Icon name="HeartHandshake" className="mr-2 inline-block" size={24} /> Community Impact (CIF)</h3>
								<p className="text-base text-gray-700 mb-6">Cơ chế tài chính minh bạch đảm bảo tái đầu tư cho bảo tồn và an sinh.</p>
								<ul className="space-y-4">
									<li className="flex items-start">
										<span className="bg-orange-100 text-orange-800 p-2 rounded-md mr-3"><Icon name="PiggyBank" size={24} /></span>
										<div><h4 className="font-bold text-lg">Quỹ Bảo Tồn Văn Hóa & Rừng (Quỹ ESG)</h4><p className="text-base text-gray-600">Trích 20% doanh thu để tái đầu tư bảo vệ 1000ha rừng và phục dựng lễ hội.</p></div>
									</li>
									<li className="flex items-start">
										<span className="bg-orange-100 text-orange-800 p-2 rounded-md mr-3"><Icon name="ShieldCheck" size={24} /></span>
										<div><h4 className="font-bold text-lg">Bảo Hiểm Sinh Kế</h4><p className="text-base text-gray-600">Hỗ trợ thu mua nông sản cho bà con khi mất mùa hoặc du lịch thấp điểm.</p></div>
									</li>
								</ul>
							</div>
						)}
					</div>
					
					{/* Visualization Side (Flow Diagram) - Full Restoration */}
					<div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md">
						<h4 className="text-center font-bold text-gray-500 uppercase text-base mb-4">ESG - Dòng Chảy Giá Trị</h4>
						<div className="grid grid-cols-3 gap-4 text-center text-base">
							<div className="col-span-3 bg-[var(--color-aur-secondary)] text-white p-3 rounded-lg shadow-md font-bold text-lg">Khách Du Lịch Trách Nhiệm / CSR</div>
							<div className="col-span-3 flex justify-center py-2 text-gray-400"><Icon name="ListChecks" size={20} /></div>
							<div className="bg-gray-50 p-3 rounded shadow border border-[var(--color-aur-primary)]">
								<div className="text-[var(--color-aur-primary)] font-bold text-lg"><Icon name="Users" size={20} /> Du Lịch</div>
								<div className="text-base mt-1">Trekking, Retreat</div>
							</div>
							<div className="bg-white p-3 rounded shadow border border-gray-300 flex items-center justify-center font-bold text-[var(--color-aur-text)] text-lg">HTX CƠ TU</div>
							<div className="bg-gray-50 p-3 rounded shadow border border-[var(--color-aur-accent)]">
								<div className="text-[var(--color-aur-accent)] font-bold text-lg"><Icon name="Leaf" size={20} /> Nông Sản</div>
								<div className="text-base mt-1">Mật ong, Đẳng sâm</div>
							</div>
							<div className="col-span-3 flex justify-center py-2 text-gray-400"><Icon name="ListChecks" size={20} /></div>
							<div className="col-span-3 bg-green-100 text-green-800 p-3 rounded-lg border border-green-200 font-bold text-lg">Cộng Đồng Hưởng Lợi & Bảo Tồn Rừng</div>
						</div>
					</div>
				</div>

				<div className="mt-12">
					<h3 className="text-xl font-bold text-[var(--color-aur-text)] mb-4 text-center">Minh Họa Chi Tiết Mô Hình (Tải ảnh của bạn)</h3>
					<div className="w-full">
						<label htmlFor="upload-solution" className="image-upload-area block cursor-pointer" id="area-solution">
							{solutionImage ? (
								<img src={solutionImage} alt="Solution Preview" className="block w-full h-auto rounded-xl shadow-lg" />
							) : (
								<div className="upload-placeholder min-h-[300px]" id="placeholder-solution">
									<Icon name="Database" size={40} className="mb-3 text-[var(--color-aur-primary)]" />
									<p className="font-bold text-lg">Bấm vào đây để chọn ảnh minh họa Giải Pháp từ máy tính</p>
									<p className="text-base">Hỗ trợ JPG, PNG (Hiển thị kích thước lớn để đọc chi tiết)</p>
								</div>
							)}
							<input type="file" id="upload-solution" className="hidden" accept="image/*" onChange={(e) => previewImage(e, setSolutionImage)} />
						</label>
					</div>
				</div>
			</div>
		</section>
	);

	const renderInnovation = (ref) => (
		<section ref={ref} className="py-16 bg-white min-h-[80vh] border-t border-gray-200">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="max-w-4xl mx-auto text-center mb-12">
					<h2 className="text-4xl font-serif font-bold text-[var(--color-aur-text)] mb-4">Điểm Đổi Mới Sáng Tạo <br/><span className="text-xl text-[var(--color-aur-secondary)]">(USP Truyền thông & marketing)</span></h2>
					<p className="text-xl text-gray-600">
						Sự khác biệt nằm ở việc <strong>Trao quyền số thực chất</strong> và <strong>cảm xúc âm thanh</strong>.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Innovation 1: Digital Empowerment */}
					<div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500">
						<div className="flex items-center mb-6">
							<div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl mr-4"><Icon name="Smartphone" size={28} /></div>
							<h3 className="text-2xl font-bold">Trao Quyền Số</h3>
						</div>
						<p className="text-base text-gray-600 mb-6">Chuyển đổi vai trò: Từ "Được kể" sang "Tự kể".</p>
						<div className="space-y-4">
							<div className="flex items-center">
								<div className="w-9 h-9 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-base font-bold">1</div>
								<div className="ml-4 flex-1">
									<h4 className="font-bold text-lg">Đào tạo Kỹ Năng</h4>
									<div className="w-full bg-gray-100 h-2 rounded-full mt-1"><div className="bg-blue-500 h-2 rounded-full" style={{width: '100%'}}></div></div>
								</div>
							</div>
							<div className="flex items-center">
								<div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base font-bold">2</div>
								<div className="ml-4 flex-1">
									<h4 className="font-bold text-lg">Thiết lập Ranh Giới Văn Hóa</h4>
									<p className="text-base text-gray-500">Quyết định cái gì được quay, cái gì cần giữ kín.</p>
								</div>
							</div>
							<div className="flex items-center">
								<div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-base font-bold">3</div>
								<div className="ml-4 flex-1">
									<h4 className="font-bold text-lg">Digital Host</h4>
									<p className="text-base text-gray-500">10 Storytellers vận hành kênh truyền thông.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Innovation 2: Sound Branding - Updated with Link Functionality */}
					<div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--color-aur-secondary)] relative group">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center">
								<div className="w-14 h-14 bg-orange-100 text-[var(--color-aur-secondary)] rounded-full flex items-center justify-center text-xl mr-4"><Icon name="Music" size={28} /></div>
								<div>
									<h3 className="text-2xl font-bold">Forest Sound Branding</h3>
									<p className="text-sm text-red-500 italic mt-1 font-semibold animate-pulse">Hãy Click để xem link nội dung mẫu</p>
								</div>
							</div>
							<div className="flex gap-2">
								{/* Link Button moved here */}
								<button onClick={setSoundLink} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition link-btn-hidden" title="Chèn Link Video/Audio">
									<Icon name="Link" size={20} />
								</button>
								<a 
									href={soundBrandingUrl || "#"} 
									target={soundBrandingUrl ? "_blank" : "_self"}
									onClick={checkSoundLink}
									className="p-2 bg-[var(--color-aur-secondary)] text-white rounded-full hover:bg-orange-700 transition flex items-center justify-center"
									title="Phát âm thanh"
								>
									<Icon name="Play" size={20} />
								</a>
							</div>
						</div>
						<p className="text-base text-gray-600 mb-6">Chiến dịch "Lắng nghe trước khi nhìn".</p>
						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 bg-[var(--color-aur-bg)] rounded-lg text-center hover:bg-orange-100 transition cursor-pointer">
								<Icon name="Waves" className="text-[var(--color-aur-secondary)] mb-2" size={24} />
								<div className="text-lg font-bold">Tiếng Suối</div>
							</div>
							<div className="p-4 bg-[var(--color-aur-bg)] rounded-lg text-center hover:bg-orange-100 transition cursor-pointer">
								<Icon name="Wind" className="text-[var(--color-aur-secondary)] mb-2" size={24} />
								<div className="text-lg font-bold">Gió Rừng</div>
							</div>
							<div className="p-4 bg-[var(--color-aur-bg)] rounded-lg text-center hover:bg-orange-100 transition cursor-pointer">
								<Icon name="Drum" className="text-[var(--color-aur-secondary)] mb-2" size={24} />
								<div className="text-lg font-bold">Cồng Chiêng</div>
							</div>
							<div className="p-4 bg-[var(--color-aur-bg)] rounded-lg text-center hover:bg-orange-100 transition cursor-pointer">
								<Icon name="HandPlatter" className="text-[var(--color-aur-secondary)] mb-2" size={24} />
								<div className="text-lg font-bold">Lễ Tạ Ơn</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);

	const renderBusinessModel = (ref) => (
		<section ref={ref} className="py-20 bg-[var(--color-aur-light)] min-h-[80vh] relative">
			<div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2F855A_1px,transparent_1px)] [background-size:16px_16px]"></div>
			<div className="container mx-auto px-4 relative z-10 max-w-7xl">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-serif font-bold text-[var(--color-aur-text)] mb-4">Chi Tiết Doanh Thu Dự Kiến</h2>
					<p className="text-xl text-gray-600">Tổng doanh thu dự kiến: <span className="font-bold text-[var(--color-aur-primary)]">~959.5 Triệu VNĐ/Năm</span></p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Revenue Details Table - Full Restoration */}
					<div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--color-aur-primary)] max-h-[500px] overflow-y-auto w-full"> 
						<h3 className="text-2xl font-bold text-[var(--color-aur-text)] mb-4 flex items-center">
							<Icon name="BadgeDollarSign" className="text-yellow-500 mr-3" size={24} /> Phân Tích Dòng Tiền
						</h3>
						<table className="w-full revenue-table text-lg">
							<tbody>
								<tr className="bg-gray-50"><td colSpan="2" className="font-bold text-[var(--color-aur-secondary)] pt-4 pb-2">1. Đặc Sản Theo Mùa & Quà Tặng</td></tr>
								<tr><td>Mật ong rừng gốc cây</td><td className="revenue-amount">22,500,000</td></tr>
								<tr><td>Đẳng Sâm tím tự nhiên tươi</td><td className="revenue-amount">20,625,000</td></tr>
								<tr><td>Đẳng Sâm tím tự nhiên khô</td><td className="revenue-amount">37,500,000</td></tr>
								<tr><td>Đẳng Sâm ngâm Mật ong</td><td className="revenue-amount">56,250,000</td></tr>
								<tr><td>Nấm Lim tự nhiên</td><td className="revenue-amount">59,375,000</td></tr>
								<tr><td>Gạo nếp/tẻ bản địa (6 tháng)</td><td className="revenue-amount">22,250,000</td></tr>
								<tr className="bg-gray-50"><td colSpan="2" className="font-bold text-gray-600 pt-4 pb-2">2. Thủ Công Mỹ Nghệ</td></tr>
								<tr><td>Gùi & đồ thủ công tre/mây</td><td className="revenue-amount">15,000,000</td></tr>
								<tr className="bg-gray-50"><td colSpan="2" className="font-bold text-[var(--color-aur-primary)] pt-4 pb-2">3. Du Lịch & Dịch Vụ</td></tr>
								<tr><td>Tour 2 ngày 1 đêm</td><td className="revenue-amount">384,000,000</td></tr>
								<tr><td>Tour 3 ngày 2 đêm</td><td className="revenue-amount">216,000,000</td></tr>
								<tr><td>Tour 4 ngày 3 đêm</td><td className="revenue-amount">126,000,000</td></tr>
								<tr className="bg-[var(--color-aur-light)] border-t-2 border-[var(--color-aur-primary)] mt-4">
									<td className="font-bold pt-4 text-xl">TỔNG CỘNG</td>
									<td className="revenue-amount text-2xl pt-4">959,500,000</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Profit Sharing Chart */}
					<div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--color-aur-secondary)]">
						<h3 className="text-2xl font-bold text-[var(--color-aur-text)] mb-2 text-center">Cơ Chế Phân Chia Lợi Nhuận</h3>
						<p className="text-base text-gray-500 text-center mb-6">Cam kết minh bạch dòng tiền về cộng đồng</p>
						<div className="chart-container h-80">
							<canvas ref={profitShareChartRef}></canvas>
						</div>
						<div className="mt-6 text-base text-gray-600 bg-gray-50 p-4 rounded-lg">
							<p className="mb-1"><Icon name="CheckCircle2" className="text-green-500 mr-2 inline-block" size={18} /><strong>65% (Cộng đồng):</strong> Chi trả trực tiếp cho nông sản, nhân sự, dịch vụ homestay.</p>
							<p className="mb-1"><Icon name="CheckCircle2" className="text-blue-500 mr-2 inline-block" size={18} /><strong>15% (Bảo tồn):</strong> Tái đầu tư rừng & văn hóa (CIF).</p>
							<p><Icon name="CheckCircle2" className="text-yellow-500 mr-2 inline-block" size={18} /><strong>15% (HTX):</strong> Quỹ phát triển & dự phòng.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);

	const renderImpact = (ref) => (
		<section ref={ref} className="py-16 bg-white min-h-[80vh]">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="max-w-4xl mx-auto text-center mb-12">
					<h2 className="text-4xl font-serif font-bold text-[var(--color-aur-text)] mb-4">Cơ Cấu Vốn & Tác Động Dự Kiến</h2>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Budget Visualization (Chart + Text) */}
					<div>
						<h3 className="text-2xl font-bold text-center mb-6">Cơ Cấu Vốn Đầu Tư (1.040.000.000 VNĐ)</h3>
						<div className="chart-container h-80">
							<canvas ref={budgetChartRef}></canvas>
						</div>
						<div className="mt-6 text-base text-gray-600 space-y-6 max-h-[400px] overflow-y-auto pr-2 border-t border-gray-200 pt-4">
							{/* Nguồn 1: Tự đầu tư */}
							<div className="bg-[var(--color-aur-light)] p-4 rounded-lg border border-[var(--color-aur-primary)]">
								<h4 className="font-bold text-[var(--color-aur-primary)] text-lg mb-1">1. Tự đầu tư - 560.000.000 VNĐ</h4>
								<p className="font-semibold text-sm mb-2 text-gray-700">Vốn đối ứng của HTX & Cộng đồng (Phần hạ tầng, thiết bị và nhân sự cốt lõi):</p>
								<ul className="list-disc ml-5 text-sm space-y-1">
									<li>Chi phí quỹ lương trong 12 tháng chi trả cho các nhân sự tham gia chịu trách nhiệm các công việc của HTX và nhân sự thuê mướn tại cộng đồng.</li>
									<li>Đầu tư hạ tầng & thiết bị: Nhà đón tiếp, nhà vệ sinh, nhà lưu trú, thiết bị sơ chế, đóng gói, sấy chế biến nông lâm sản...</li>
									<li>Hỗ trợ cây giống, vật nuôi (mô hình vườn rừng-ao-chuồng-ruộng).</li>
									<li>Chi phí thành lập & Quỹ hỗ trợ vận hành HTX.</li>
								</ul>
								<p className="text-xs italic mt-2 text-gray-500">Cộng đồng địa phương đối ứng 20%, HTX đầu tư 80%</p>
							</div>

							{/* Nguồn 2: Bên thứ ba */}
							<div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
								<h4 className="font-bold text-blue-700 text-lg mb-1">2. Đóng góp từ bên thứ ba - 300.000.000 VNĐ</h4>
								<p className="font-semibold text-sm mb-2 text-gray-700">Từ nguồn ST4SD - Dự án Marketing sáng tạo du lịch (Đã xác nhận tài trợ):</p>
								<ul className="list-disc ml-5 text-sm space-y-1">
									<li>Bao gồm các hạng mục: Truyền thông/Website, Tham quan học tập, Thủy điện mini, Thiết bị ghi hình và Phục dựng không gian văn hóa.</li>
								</ul>
							</div>

							{/* Nguồn 3: Đề nghị ST4SD */}
							<div className="bg-orange-50 p-4 rounded-lg border border-[var(--color-aur-secondary)]">
								<h4 className="font-bold text-[var(--color-aur-secondary)] text-lg mb-1">3. Số tiền đề nghị từ dự án ST4SD - 180.000.000 VNĐ</h4>
								<p className="font-semibold text-sm mb-2 text-gray-700">Tài trợ Hợp phần Phát triển Sản phẩm & Nhân lực:</p>
								<ul className="list-disc ml-5 text-sm space-y-1">
									<li>Chi phí nhân sự hỗ trợ vận hành & điều hành dự án.</li>
									<li>Chi phí mua sắm Thiết bị công nghệ (Máy Fly-cam, Máy thu âm, Tai nghe, Điện thoại tác nghiệp).</li>
									<li>Chi phí đào tạo tiếng Anh – Việt & đào tạo kỹ năng nghiệp vụ dịch vụ du lịch.</li>
								</ul>
							</div>
						</div>
					</div>
					{/* Impact Chart */}
					<div>
						<h3 className="text-2xl font-bold text-center mb-6">Chỉ Số Tác Động (KPI 12 Tháng)</h3>
						<div className="chart-container h-80">
							<canvas ref={impactChartRef}></canvas>
						</div>
						<div className="grid grid-cols-2 gap-4 mt-6">
							<div className="bg-green-50 p-3 rounded border border-green-100 text-center">
								<div className="font-bold text-green-700 text-xl">1.5 - 2.5 Triệu</div>
								<div className="text-base text-gray-500">Thu nhập tăng thêm/hộ/tháng</div>
							</div>
							<div className="bg-green-50 p-3 rounded border border-green-100 text-center">
								<div className="font-bold text-green-700 text-xl">80%</div>
								<div className="text-base text-gray-500">Hộ dân tham gia dự án</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12">
					<h3 className="text-xl font-bold text-[var(--color-aur-text)] mb-4 text-center">Minh Họa Chi Tiết Tài Chính (Tải ảnh của bạn)</h3>
					<div className="w-full">
						<label htmlFor="upload-finance" className="image-upload-area block cursor-pointer" id="area-finance">
							{financeImage ? (
								<img src={financeImage} alt="Finance Preview" className="block w-full h-auto rounded-xl shadow-lg" />
							) : (
								<div className="upload-placeholder min-h-[300px]" id="placeholder-finance">
									<Icon name="Scale" size={40} className="mb-3 text-[var(--color-aur-secondary)]" />
									<p className="font-bold text-lg">Bấm vào đây để chọn ảnh minh họa Tài Chính từ máy tính</p>
									<p className="text-base">Hỗ trợ JPG, PNG (Khung lớn Full Width)</p>
								</div>
							)}
							<input type="file" id="upload-finance" className="hidden" accept="image/*" onChange={(e) => previewImage(e, setFinanceImage)} />
						</label>
					</div>
				</div>
			</div>
		</section>
	);

	const renderRoadmap = (ref) => (
		<section ref={ref} className="py-16 bg-[var(--color-aur-bg)] min-h-[80vh]">
			<div className="container mx-auto px-4 max-w-7xl">
				<h2 className="text-4xl font-serif font-bold text-[var(--color-aur-text)] text-center mb-12">Lộ Trình Thực Hiện</h2>
				<div className="relative max-w-4xl mx-auto">
					<div className="connector-line hidden md:block"></div>
					
					{/* Phase 1 */}
					<div className="relative z-10 mb-12 md:flex md:justify-between items-center group">
						<div className="md:w-5/12 text-right pr-8 hidden md:block">
							<h3 className="text-xl font-bold text-[var(--color-aur-primary)]">Giai Đoạn 1: Khởi Tạo (T1-3)</h3>
						</div>
						<div className="w-12 h-12 bg-white border-4 border-[var(--color-aur-primary)] rounded-full flex items-center justify-center shadow mx-auto md:mx-0 font-bold text-[var(--color-aur-primary)] text-lg">1</div>
						<div className="md:w-5/12 pl-8 mt-4 md:mt-0 bg-white p-6 rounded-lg shadow-sm group-hover:shadow-md transition">
							<ul className="text-base text-gray-600 list-disc ml-4">
								<li>Thành lập bộ khung quản trị HTX.</li>
								<li>Xây dựng Website song ngữ & Branding.</li>
								<li>Liên kết 3 bên: Chính quyền - Doanh nghiệp - Dân.</li>
							</ul>
						</div>
					</div>
					
					{/* Phase 2 */}
					<div className="relative z-10 mb-12 md:flex md:justify-between items-center group flex-row-reverse">
						<div className="md:w-5/12 text-left pl-8 hidden md:block">
							<h3 className="text-xl font-bold text-[var(--color-aur-secondary)]">Giai Đoạn 2: Đào Tạo & Xây Dựng (T3-7)</h3>
						</div>
						<div className="w-12 h-12 bg-white border-4 border-[var(--color-aur-secondary)] rounded-full flex items-center justify-center shadow mx-auto md:mx-0 font-bold text-[var(--color-aur-secondary)] text-lg">2</div>
						<div className="md:w-5/12 pr-8 mt-4 md:mt-0 bg-white p-6 rounded-lg shadow-sm group-hover:shadow-md transition text-left md:text-right">
							<h4 className="font-bold md:hidden text-[var(--color-aur-secondary)] mb-2">Giai Đoạn 2: Đào Tạo Năng Lực & Xây Dựng Sản Phẩm</h4>
							<div className="text-base text-gray-600 space-y-3">
								<div>
									<h5 className="font-bold text-[var(--color-aur-secondary)]">Hoạt Động Trọng Tâm:</h5>
									<ul className="list-disc ml-4 mt-1 space-y-1">
										<li><strong>Workshop Cộng Đồng 1:</strong> Giới thiệu dự án, lắng nghe thông tin cộng đồng.</li>
										<li>
											<strong>Đào Tạo Indigenous Storytellers:</strong> Chuyên sâu:
											<ul className="list-[circle] ml-5 mt-1 text-sm text-gray-500">
												<li>Kỹ năng thuyết trình & lắng nghe.</li>
												<li>Kỹ năng thiết lập ranh giới văn hóa (quan trọng nhất).</li>
												<li>Ngoại ngữ (Tiếng Anh – Tiếng Việt – Tiếng Cơ Tu).</li>
											</ul>
										</li>
										<li><strong>Liên Kết Học Tập:</strong> Tham quan mô hình CBT tiêu biểu (Hội An).</li>
										<li><strong>Thu Âm Forest Sound:</strong> Ghi lại âm thanh làng, rừng, sinh hoạt truyền thống.</li>
										<li>
											<strong>Xây Dựng Sản Phẩm Mẫu:</strong>
											<ul className="list-[circle] ml-5 mt-1 text-sm text-gray-500">
												<li>Tour 1 ngày, Lưu trú 1 đêm.</li>
												<li>Trải nghiệm workshop (đan lát, nấu ăn...).</li>
											</ul>
										</li>
									</ul>
								</div>
								<div className="pt-2 border-t border-orange-100">
									<p className="text-sm font-semibold text-orange-700 italic">Kết quả: 10 Storytellers, sản phẩm tour mẫu & tài liệu âm thanh.</p>
								</div>
							</div>
						</div>
					</div>
					
					{/* Phase 3 */}
					<div className="relative z-10 mb-12 md:flex md:justify-between items-center group">
						<div className="md:w-5/12 text-right pr-8 hidden md:block">
							<h3 className="text-xl font-bold text-blue-600">Giai Đoạn 3: Marketing & Pilot (T7-9)</h3>
						</div>
						<div className="w-12 h-12 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow mx-auto md:mx-0 font-bold text-blue-600 text-lg">3</div>
						<div className="md:w-5/12 pl-8 mt-4 md:mt-0 bg-white p-6 rounded-lg shadow-sm group-hover:shadow-md transition">
							<h4 className="font-bold md:hidden text-blue-600 mb-2">Giai Đoạn 3: Triển Khai Marketing Đổi Mới & Pilot</h4>
							<div className="text-base text-gray-600 space-y-3">
								<div>
									<h5 className="font-bold text-blue-600">Hoạt Động Trọng Tâm:</h5>
									<ul className="list-disc ml-4 mt-1 space-y-1">
										<li><strong>Chương Trình Học Tập & Giao Lưu:</strong> Tại các mô hình CBT tiêu biểu (Hội An, tháng 5–6).</li>
										<li>
											<strong>Pilot Tour (Tour Thí Điểm):</strong>
											<ul className="list-[circle] ml-5 mt-1 text-sm text-gray-500">
												<li>2–3 chuyến pilot cho đối tác chiến lược (TA, Nhà nghiên cứu, BQL).</li>
												<li>Mục đích: Thu thập phản hồi, kiểm chứng sản phẩm.</li>
											</ul>
										</li>
										<li><strong>Thử Nghiệm Vận Hành Tour:</strong> Tại làng pilot với khách thực tế.</li>
										<li><strong>Triển Khai Marketing:</strong> Lên sóng website, mạng xã hội.</li>
									</ul>
								</div>
								<div className="pt-2 border-t border-blue-100">
									<p className="text-sm font-semibold text-blue-700 italic">Kết quả: Feedback từ đối tác, tour được kiểm chứng, sẵn sàng mở rộng.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Phase 4: Đánh Giá & Bền Vững */}
					<div className="relative z-10 mb-12 md:flex md:justify-between items-center group flex-row-reverse">
						<div className="md:w-5/12 text-left pl-8 hidden md:block">
							<h3 className="text-xl font-bold text-purple-600">Giai Đoạn 4: Đánh Giá & Bền Vững (T9-12)</h3>
						</div>
						<div className="w-12 h-12 bg-white border-4 border-purple-600 rounded-full flex items-center justify-center shadow mx-auto md:mx-0 font-bold text-purple-600 text-lg">4</div>
						<div className="md:w-5/12 pr-8 mt-4 md:mt-0 bg-white p-6 rounded-lg shadow-sm group-hover:shadow-md transition text-left md:text-right">
							<h4 className="font-bold md:hidden text-purple-600 mb-2">Giai Đoạn 4</h4>
							<ul className="text-base text-gray-600 list-disc ml-4 md:ml-0 md:mr-4 md:list-none inline-block">
								<li><strong>Workshop Cộng Đồng 2:</strong> Đánh giá giữa kỳ, lắng nghe phản hồi.</li>
								<li><strong>Hoàn Thiện Sản Phẩm:</strong> Tối ưu hóa 1–2 tour mẫu từ feedback.</li>
								<li><strong>Thử Nghiệm Mở Rộng:</strong> Tiếp đón khách thực tế.</li>
								<li><strong>Đánh Giá Tác Động:</strong> Đo thu nhập, số lượng khách & niềm tin Storytellers.</li>
								<li><strong>Báo Cáo Cuối Kỳ:</strong> Tháng 12.</li>
							</ul>
							<div className="mt-3 pt-3 border-t border-purple-100">
								<p className="text-sm font-semibold text-purple-700 italic">Kết quả: Dữ liệu tác động, sản phẩm ổn định & báo cáo hoàn chỉnh.</p>
							</div>
						</div>
					</div>

					{/* Phase 5: 12 Tháng Tiếp Theo */}
					<div className="relative z-10 mb-12 md:flex md:justify-between items-center group">
						<div className="md:w-5/12 text-right pr-8 hidden md:block">
							<h3 className="text-xl font-bold text-[var(--color-aur-accent)]">Giai Đoạn 5: 12 Tháng Tiếp Theo</h3>
						</div>
						<div className="w-12 h-12 bg-white border-4 border-[var(--color-aur-accent)] rounded-full flex items-center justify-center shadow mx-auto md:mx-0 font-bold text-[var(--color-aur-accent)] text-lg">5</div>
						<div className="md:w-5/12 pl-8 mt-4 md:mt-0 bg-white p-6 rounded-lg shadow-sm group-hover:shadow-md transition">
							<h4 className="font-bold md:hidden text-[var(--color-aur-accent)] mb-2">Giai Đoạn 5</h4>
							<p className="text-base text-gray-700 font-medium mb-2">Hoàn thiện, nâng cấp và nhân rộng mô hình Pilot.</p>
							<p className="text-sm text-gray-500">Tiếp tục mở rộng quy mô tác động, kết nối thị trường sâu rộng và chuyển giao hoàn toàn quyền vận hành cho cộng đồng.</p>
						</div>
					</div>

				</div>
			</div>
		</section>
	);

	const renderCommitment = (ref) => (
		<section ref={ref} className="py-20 bg-[var(--color-aur-primary)] text-white min-h-[80vh] relative overflow-hidden flex flex-col justify-center">
			<div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
			<div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
			<div className="container mx-auto px-4 relative z-10 max-w-7xl">
				<h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Đối Chiếu SDGs & Cam Kết Giá Trị</h2>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
						<div className="flex justify-between items-start mb-4">
							<Icon name="Landmark" className="text-[var(--color-aur-accent)]" size={36} />
							<span className="bg-blue-600 text-white text-base px-2 py-1 rounded font-bold">SDG 11</span>
						</div>
						<h3 className="font-bold text-xl mb-2">Nhận Thức Di Sản</h3>
						<p className="text-base text-gray-200">Gìn giữ bản sắc Cơ Tu, biến di sản thành tài sản bền vững cho cộng đồng.</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
						<div className="flex justify-between items-start mb-4">
							<Icon name="Megaphone" className="text-[var(--color-aur-accent)]" size={36} />
							<span className="bg-red-500 text-white text-base px-2 py-1 rounded font-bold">SDG 4</span>
						</div>
						<h3 className="font-bold text-xl mb-2">Đổi Mới Truyền Thông</h3>
						<p className="text-base text-gray-200">Giáo dục kỹ năng số, trao quyền cho người dân "Tự kể" (Storytelling).</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
						<div className="flex justify-between items-start mb-4">
							<Icon name="Sprout" className="text-[var(--color-aur-accent)]" size={36} />
							<span className="bg-purple-600 text-white text-base px-2 py-1 rounded font-bold">SDG 1, 8</span>
						</div>
						<h3 className="font-bold text-xl mb-2">Sinh Kế Kép</h3>
						<p className="text-base text-gray-200">Tăng thu nhập, tạo việc làm bền vững từ Nông nghiệp & Du lịch.</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
						<div className="flex justify-between items-start mb-4">
							<Icon name="Users" className="text-[var(--color-aur-accent)]" size={36} />
							<span className="bg-orange-500 text-white text-base px-2 py-1 rounded font-bold">SDG 5</span>
						</div>
						<h3 className="font-bold text-xl mb-2">Bền Vững Xã Hội</h3>
						<p className="text-base text-gray-200">Ưu tiên phụ nữ tham gia (50% Storytellers), không ai bị bỏ lại phía sau.</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
						<div className="flex justify-between items-start mb-4">
							<Icon name="Globe" className="text-[var(--color-aur-accent)]" size={36} />
							<span className="bg-green-600 text-white text-base px-2 py-1 rounded font-bold">SDG 13, 15</span>
						</div>
						<h3 className="font-bold text-xl mb-2">Bảo Tồn Môi Trường</h3>
						<p className="text-base text-gray-200">Bảo vệ 1,000ha rừng, giảm phát thải thông qua du lịch trách nhiệm.</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
						<div className="flex justify-between items-start mb-4">
							<Icon name="Maximize" className="text-[var(--color-aur-accent)]" size={36} />
							<span className="bg-gray-600 text-white text-base px-2 py-1 rounded font-bold">SDG 17</span>
						</div>
						<h3 className="font-bold text-xl mb-2">Hợp Tác & Nhân Rộng</h3>
						<p className="text-base text-gray-200">Mô hình liên kết 4 nhà, dễ dàng nhân rộng sang các xã miền núi khác.</p>
					</div>
				</div>

				<div className="text-center max-w-3xl mx-auto">
					<div className="mb-6 text-[var(--color-aur-accent)] text-4xl">"</div>
					<h3 className="text-3xl md:text-4xl font-serif italic font-light mb-6">
						"Nghe để hiểu - Hiểu để chạm - Chạm để trân quý và gìn giữ"
					</h3>
					<p className="text-xl text-gray-200 mb-8">
						Dự án này không chỉ là một kế hoạch kinh doanh. Đó là lời cam kết đồng hành cùng Làng Aur trên hành trình tìm lại và tỏa sáng giá trị bản địa.
					</p>
				</div>
			</div>
		</section>
	);

	return (
		<div className="bg-[var(--color-aur-bg)] text-[var(--color-aur-text)] font-sans antialiased min-h-screen pb-20 pt-16"
			style={styles}>
			
			{/* FIXED NAVIGATION */}
			<nav className="fixed top-0 w-full z-50 bg-[var(--color-aur-bg)]/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
				<div className="container mx-auto px-4 max-w-7xl">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center cursor-pointer" onClick={() => handleSwitchTab('header')}>
							
						</div>
						
						{/* Desktop Menu */}
						<div className="hidden lg:flex items-center space-x-1 overflow-x-auto">
							{Object.entries(TAB_MAP).map(([id, label]) => (
								<button	
									key={id}	
									onClick={() => handleSwitchTab(id)}
									className={`px-3 py-2 rounded-md transition text-sm font-semibold uppercase tracking-wide whitespace-nowrap ${activeTab === id ? 'bg-[var(--color-aur-secondary)] text-white shadow' : 'text-gray-600 hover:text-[var(--color-aur-primary)] hover:bg-gray-100'}`}
								>
									{label}
								</button>
							))}
							<button onClick={() => downloadPage()} className="ml-2 px-3 py-2 bg-[var(--color-aur-primary)] text-white rounded-md hover:bg-green-700 transition shadow-sm flex items-center text-sm">
								<Icon name="Download" className="mr-1" size={16} /> Tải
							</button>
						</div>

						{/* Mobile Menu Button */}
						<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-[var(--color-aur-text)]">
							<Icon name={isMenuOpen ? "X" : "Menu"} size={28} />
						</button>
					</div>
				</div>

				{/* Mobile Menu Panel */}
				{isMenuOpen && (
					<div className="lg:hidden bg-white border-b border-gray-200 p-4 shadow-xl absolute w-full left-0 top-16 z-50">
						<div className="grid grid-cols-2 gap-2">
							{Object.entries(TAB_MAP).map(([id, label]) => (
								<button	
									key={id}	
									onClick={() => handleSwitchTab(id)}
									className={`block w-full py-3 text-center rounded-lg border font-bold ${activeTab === id ? 'bg-[var(--color-aur-secondary)] text-white border-[var(--color-aur-secondary)]' : 'border-gray-200 text-gray-700'}`}
								>
									{label}
								</button>
							))}
						</div>
						<button onClick={() => { downloadPage(); setIsMenuOpen(false); }} className="w-full mt-4 px-4 py-3 bg-[var(--color-aur-primary)] text-white rounded-lg font-bold flex items-center justify-center">
							<Icon name="Download" className="mr-2" size={20} /> Tải Web Về Máy
						</button>
					</div>
				)}
			</nav>

			{/* MAIN CONTENT AREA - CONDITIONAL RENDERING VIA CSS CLASS */}
			<main className="container mx-auto">
				<div className={`tab-content ${activeTab === 'header' ? 'block animate-fade-in' : 'hidden'}`}>{renderHeader()}</div>
				<div className={`tab-content ${activeTab === 'context' ? 'block animate-fade-in' : 'hidden'}`}>{renderContext(contextRef)}</div>
				<div className={`tab-content ${activeTab === 'solution' ? 'block animate-fade-in' : 'hidden'}`}>{renderSolution(solutionRef)}</div>
				<div className={`tab-content ${activeTab === 'innovation' ? 'block animate-fade-in' : 'hidden'}`}>{renderInnovation(innovationRef)}</div>
				<div className={`tab-content ${activeTab === 'business-model' ? 'block animate-fade-in' : 'hidden'}`}>{renderBusinessModel(businessModelRef)}</div>
				<div className={`tab-content ${activeTab === 'impact' ? 'block animate-fade-in' : 'hidden'}`}>{renderImpact(impactRef)}</div>
				<div className={`tab-content ${activeTab === 'roadmap' ? 'block animate-fade-in' : 'hidden'}`}>{renderRoadmap(roadmapRef)}</div>
				<div className={`tab-content ${activeTab === 'commitment' ? 'block animate-fade-in' : 'hidden'}`}>{renderCommitment(commitmentRef)}</div>
				<div className={`tab-content ${activeTab === 'governance' ? 'block animate-fade-in' : 'hidden'}`}>{renderGovernanceSection(governanceRef)}</div>
			</main>
			
			{/* Footer (Always Visible) */}
			<footer className="bg-gray-800 text-white py-8 mt-auto">
				<div className="container mx-auto px-4 text-center">
					<p className="text-sm text-gray-400">&copy; 2025 HTX Du Lich & Van Hoa Cơ Tu Trường Sơn.</p>
				</div>
			</footer>

			{/* MODAL & TOAST */}
			<div id="linkModal" className={`fixed inset-0 z-[100] bg-black bg-opacity-50 items-center justify-center ${isModalOpen ? 'flex' : 'hidden'}`}>
				<div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
					<h3 className="text-xl font-bold mb-4">Chèn Link Video/Website</h3>
					<input type="text" value={linkInput} onChange={(e) => setLinkInput(e.target.value)} className="w-full p-3 border rounded-lg mb-4" placeholder="https://..." />
					<div className="flex justify-end space-x-3">
						<button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Hủy</button>
						<button onClick={saveLink} className="px-4 py-2 bg-[var(--color-aur-primary)] text-white rounded-lg">Lưu</button>
					</div>
				</div>
			</div>

			<style>{`
				#customToast { visibility: hidden; min-width: 250px; background-color: #2D3748; color: #fff; text-align: center; border-radius: 8px; padding: 16px; position: fixed; z-index: 101; right: 20px; bottom: 20px; font-size: 17px; opacity: 0; transition: opacity 0.5s, visibility 0s linear 0.5s; }
				#customToast.show { visibility: visible; opacity: 1; transition: opacity 0.5s; }
				.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
				@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
				/* Hiển thị nút link khi hover vào khung Forest Sound Branding */
				.link-btn-hidden { opacity: 0; pointer-events: none; transition: all 0.3s; }
				.group:hover .link-btn-hidden { opacity: 1; pointer-events: auto; }
			`}</style>
			<div id="customToast" className={showToast ? 'show' : ''}><Icon name="CheckCircle2" className="mr-2 inline" /> {toastMessage}</div>
		</div>
	);
};

export default App;
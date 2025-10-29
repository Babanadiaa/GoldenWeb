import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Логотип та соцмережі */}
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-3xl mb-4">LOGO</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-blue-600 text-2xl"><FaFacebookF /></a>
                        <a href="#" className="hover:text-pink-500 text-2xl"><FaInstagram /></a>
                        <a href="#" className="hover:text-black text-2xl"><SiTiktok /></a>
                    </div>
                </div>

                {/* Каталог */}
                <div className="flex flex-col sm:flex-row gap-8 md:col-span-2">
                    <div className="flex-1">
                        <h4 className="font-semibold mb-4 text-center sm:text-left">Каталог</h4>
                        <ul className="space-y-2 text-center sm:text-left">
                            <li><a href="#" className="hover:underline">Menu</a></li>
                            <li><a href="#" className="hover:underline">Menu</a></li>
                            <li><a href="#" className="hover:underline">Menu</a></li>
                            <li><a href="#" className="hover:underline">Menu</a></li>
                            <li><a href="#" className="hover:underline">Menu</a></li>
                        </ul>
                    </div>

                    {/* Контакти */}
                    <div className="flex-1 mt-6 sm:mt-0">
                        <h4 className="font-semibold mb-4 text-center sm:text-left">Контакти</h4>
                        <ul className="space-y-2 text-center sm:text-left text-sm">
                            <li>Телефон: +38 (011) 011 01 01</li>
                            <li>Email: jellys@jellys.ua</li>
                            <li>Адреса: Kyiv, White Bat Street, 25</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Нижній рядок */}
            <div className="bg-gray-900 text-gray-100 text-center py-2 text-sm">
                Розробка сайту Golden Web digital
            </div>
        </footer>
    )
}

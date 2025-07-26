import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
            <div className='text-center'>
                <h1 className='text-6xl font-bold text-red-500 mb-4'>404</h1>
                <h2 className='text-2xl font-semibold mb-4'>
                    Страница не найдена
                </h2>
                <p className='text-gray-400 mb-8'>
                    Запрашиваемая страница не существует или была перемещена.
                </p>
                <Link
                    href='/'
                    className='inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}

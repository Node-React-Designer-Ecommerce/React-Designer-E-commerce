
export default function Delivery() {
    return (
        <div className="w-full pt-2">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Delivery</h3>
                <p className="text-sm mb-4">Free standard shipping on orders over <strong>$35</strong> before tax, plus free returns.</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">Type</th>
                                <th className="py-2 px-4 border-b">How Long</th>
                                <th className="py-2 px-4 border-b">How Much</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td className="py-2 px-4 border-b">Standard delivery</td>
                                <td className="py-2 px-4 border-b">1-4 business days</td>
                                <td className="py-2 px-4 border-b">$4.50</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">Express delivery</td>
                                <td className="py-2 px-4 border-b">1 business day</td>
                                <td className="py-2 px-4 border-b">$10.00</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4">Pick up in store</td>
                                <td className="py-2 px-4">1-3 business days</td>
                                <td className="py-2 px-4">Free</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Return</h3>
                <p className="text-sm mb-4">You have <strong>60 days</strong> to return the item(s) using any of the following methods:</p>
                <ul className="list-disc list-inside text-sm">
                    <li>Free store return</li>
                    <li>Free returns via USPS Dropoff Service</li>
                </ul>
            </div>
                <p className="uppercase text-gray-400">free shipping on orders 100 dollar</p>
        </div>

    )
}

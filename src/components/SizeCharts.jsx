
export default function SizeCharts() {
  return (
    <div className="overflow-x-auto">
  <table className="border-collapse border rounded-2xl border-gray-300 w-full">
    <thead>
      <tr className="bg-gray-100 ">
        <th className="px-4 py-2 border border-gray-300">Size</th>
        <th className="px-4 py-2 border border-gray-300">Chest-cms</th>
        <th className="px-4 py-2 border border-gray-300">Waist-cms</th>
        <th className="px-4 py-2 border border-gray-300">Hips-cms</th>
      </tr>
    </thead>
    <tbody className="text-center">
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">XS</td>
        <td className="px-4 py-2 border border-gray-300">87-92</td>
        <td className="px-4 py-2 border border-gray-300">71-76</td>
        <td className="px-4 py-2 border border-gray-300">&lt; 92</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">S</td>
        <td className="px-4 py-2 border border-gray-300">92-97</td>
        <td className="px-4 py-2 border border-gray-300">76-81</td>
        <td className="px-4 py-2 border border-gray-300">92-97</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">M</td>
        <td className="px-4 py-2 border border-gray-300">97-102</td>
        <td className="px-4 py-2 border border-gray-300">81-86</td>
        <td className="px-4 py-2 border border-gray-300">97-102</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">L</td>
        <td className="px-4 py-2 border border-gray-300">102-107</td>
        <td className="px-4 py-2 border border-gray-300">86-91</td>
        <td className="px-4 py-2 border border-gray-300">102-107</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">XL</td>
        <td className="px-4 py-2 border border-gray-300">107-112</td>
        <td className="px-4 py-2 border border-gray-300">91-96</td>
        <td className="px-4 py-2 border border-gray-300">107-112</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">XXL</td>
        <td className="px-4 py-2 border border-gray-300">112-117</td>
        <td className="px-4 py-2 border border-gray-300">96-101</td>
        <td className="px-4 py-2 border border-gray-300">112-117</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">3XL</td>
        <td className="px-4 py-2 border border-gray-300">117-122</td>
        <td className="px-4 py-2 border border-gray-300">101-106</td>
        <td className="px-4 py-2 border border-gray-300">117-122</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border border-gray-300 font-bold">4XL</td>
        <td className="px-4 py-2 border border-gray-300">122-127</td>
        <td className="px-4 py-2 border border-gray-300">106-111</td>
        <td className="px-4 py-2 border border-gray-300">&gt; 122</td>
      </tr>
    </tbody>
  </table>
</div>

  )
}

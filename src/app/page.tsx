"use client";
import Image from "next/image";
import Header from "../app/components/header";
import { Icon } from "./components/Icons";
import { useState, useEffect } from "react";

export default function Home() {
  const moedas = [
    { id: 1, name: "Dólar Americano", code: "USD" },
    { id: 2, name: "Euro", code: "EUR" },
    { id: 3, name: "Iene Japonês", code: "JPY" },
    { id: 4, name: "Libra Esterlina", code: "GBP" },
    { id: 5, name: "Dólar Australiano", code: "AUD" },
    { id: 6, name: "Dólar Canadense", code: "CAD" },
    { id: 7, name: "Franco Suíço", code: "CHF" },
    { id: 8, name: "Renminbi Chinês (Yuan)", code: "CNY" },
    { id: 9, name: "Dólar Neozelandês", code: "NZD" },
    { id: 10, name: "Real Brasileiro", code: "BRL" },
    { id: 11, name: "Rupia Indiana", code: "INR" },
    { id: 12, name: "Rublo Russo", code: "RUB" },
    { id: 13, name: "Peso Mexicano", code: "MXN" },
    { id: 14, name: "Rand Sul-Africano", code: "ZAR" },
    { id: 15, name: "Won Sul-Coreano", code: "KRW" },
  ];
  
  const [inputValue, setInputValue] = useState("1"); 
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);

  const [DropdownEsquerdoEstaAberto, setDropdownEsquerdo] = useState(false);
  const [MoedaSelecionadaEsquerda, setMoedaEsquerda] = useState("USD");

  const [DropdownDireitoEstaAberto, setDropdownDireito] = useState(false);
  const [MoedaSelecionadaDireita, setMoedaDireita] = useState("BRL");

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/exchangerate?baseCurrency=${MoedaSelecionadaEsquerda}&targetCurrency=${MoedaSelecionadaDireita}&amount=${debouncedInputValue}`);
        const data = await res.json();
        setExchangeRate(data.conversion_result);
      } catch (error) {
        console.error("Erro ao carregar a taxa de câmbio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [debouncedInputValue, MoedaSelecionadaEsquerda, MoedaSelecionadaDireita]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); 
  };

  const mudarDropdownEsquerdo = () => {
    setDropdownEsquerdo(!DropdownEsquerdoEstaAberto);
    setDropdownDireito(false);
  };

  const mudarDropdownDireito = () => {
    setDropdownDireito(!DropdownDireitoEstaAberto);
    setDropdownEsquerdo(false);
  };

  const handleMoedaSelecionadaEsquerda = (moeda: string) => {
    setMoedaEsquerda(moeda);
    setDropdownEsquerdo(false);
  };

  const handleMoedaSelecionadaDireita = (moeda: string) => {
    setMoedaDireita(moeda);
    setDropdownDireito(false);
  };

  const trocarMoedas = () => {
    setMoedaEsquerda(MoedaSelecionadaDireita)
    setMoedaDireita(MoedaSelecionadaEsquerda)
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="w-full h-full flex flex-col p-4 overflow-y-auto gap-40">
        <div className="flex items-center self-start gap-4 justify-between ml-auto mr-auto">
          <Icon name="exchange" className="object-contain w-[55px] lg:w-[35px]"></Icon>
          <h1 className="text-2xl">Conversor de moedas</h1>
        </div>
        <section className="flex flex-col items-center justify-center ml-auto mr-auto border-0 rounded-0 gap-6 shadow-0 w-full
          lg:gap-4 lg:p-10 lg:border-2 lg:border-black lg:rounded-[50px] lg:shadow-xl lg:w-auto">
          <div className="flex justify-between items-center w-full
          lg:w-[400px]">
            <div className="flex flex-col relative">
              <span>De:</span>
              <button
                onClick={mudarDropdownEsquerdo}
                className="border border-black p-1 rounded flex gap-2 shadow-lg lg:text-lg text-2xl"
              >
                <Icon name={MoedaSelecionadaEsquerda} className="object-contain"></Icon>
                {MoedaSelecionadaEsquerda}
                <Icon name="chevron" size={15} className="object-contain"></Icon>
              </button>
              {DropdownEsquerdoEstaAberto && (
                <div className="absolute top-full mt-1 w-full border border-gray-200 rounded shadow-lg bg-white lg:text-lg z-10 text-2xl">
                  {moedas.map((moeda) => (
                    <button
                      key={moeda.id}
                      onClick={() => handleMoedaSelecionadaEsquerda(moeda)}
                      className="flex block w-full p-1 text-left hover:bg-gray-100 gap-1"
                    >
                      <Icon name={moeda} className="object-contain"></Icon>
                      {moeda}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="self-end">
              <Icon name="alter" onClick={trocarMoedas} />
            </button>
            <div className="flex flex-col relative">
              <span>Para:</span>
              <button
                onClick={mudarDropdownDireito}
                className="border border-black p-1 rounded flex gap-2 shadow-lg lg:text-lg text-2xl"
              >
                <Icon name={MoedaSelecionadaDireita} className="object-contain"></Icon>
                {MoedaSelecionadaDireita}
                <Icon name="chevron" size={15} className="object-contain"></Icon>
              </button>
              {DropdownDireitoEstaAberto && (
                <div className="absolute top-full mt-1 w-full border border-gray-200 rounded shadow-lg bg-white z-10 lg:text-lg text-2xl">
                  {moedas.map((moeda) => (
                    <button
                      key={moeda.id}
                      onClick={() => handleMoedaSelecionadaDireita(moeda)}
                      className="flex block w-full p-1 text-left hover:bg-gray-100 gap-1"
                    >
                      <Icon name={moeda} className="object-contain"></Icon>
                      {moeda}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center w-full 
          lg:w-[400px]">
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange} 
              id="amountInput"
              className="border border-black shadow-lg rounded p-1 min-w-[100px] w-auto lg:text-lg text-2xl"
            />
            <Icon name="rightArrow" className="ml-2 mr-2" />
            {loading ? <span>Carregando...</span> : <span className="border border-black rounded shadow-lg p-1 w-full min-w-[100px] w-auto h-full lg:text-lg text-2xl">{exchangeRate}</span>}
          </div>
        </section>
        <section className="ml-auto mr-auto w-full lg:w-[800px]">
          <div >
            <h1 className="text-3xl font-bold mb-8">O que é um converso de moedas?</h1>
          </div>
          <div>
            <p className="text-lg mb-8">Um conversor de moedas permite verificar quanto uma certa quantidade de uma moeda de um país vale em relação à outra.</p>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-8">Por que usar o conversor de moedas da xxxxxx?</h1>
          </div>
          <div>
            <p className="text-lg mb-8">O conversor da xxxxxx oferece precisão nas cotações das principais economias do planeta, além de funcionamento 24/7, garantindo uma experiência confortável e confiável.</p>
          </div>
        </section>
        <footer>
          
        </footer>
      </main>
    </div>
  );
}

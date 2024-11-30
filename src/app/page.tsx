"use client";
import Image from "next/image";
import Header from "../app/components/header";
import { Icon } from "./components/Icons";
import { useState, useEffect } from "react";

export default function Home() {
  const moedas = ["USD", "EUR", "JPY", "BRL", "AUD"];
  
  const [inputValue, setInputValue] = useState("0"); 
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
      <main className="w-full h-full flex flex-col p-4 overflow-y-auto">
        <div className="flex self-start gap-4 justify-between ml-auto mr-auto">
          <Icon name="exchange" className="object-contain"></Icon>
          <h1 className="text-xl">Conversor de moedas</h1>
        </div>
        <section className="p-8 flex flex-col items-center justify-center border-2 border-black rounded-[50px] shadow-xl ml-auto mr-auto gap-4">
          <div className="flex justify-between items-center w-[400px]">
            <div className="flex flex-col relative">
              <span>De:</span>
              <button
                onClick={mudarDropdownEsquerdo}
                className="border border-black p-1 rounded flex gap-2"
              >
                <Icon name={MoedaSelecionadaEsquerda}></Icon>
                {MoedaSelecionadaEsquerda}
                <Icon name="chevron" size={15} className="object-contain "></Icon>
              </button>
              {DropdownEsquerdoEstaAberto && (
                <div className="absolute top-full mt-1 w-full border border-gray-200 rounded shadow-lg bg-white z-10">
                  {moedas.map((moeda) => (
                    <button
                      key={moeda}
                      onClick={() => handleMoedaSelecionadaEsquerda(moeda)}
                      className="flex block w-full p-1 text-left hover:bg-gray-100 gap-1"
                    >
                      <Icon name={moeda}></Icon>
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
                className="border border-black p-1 rounded flex gap-2"
              >
                <Icon name={MoedaSelecionadaDireita}></Icon>
                {MoedaSelecionadaDireita}
                <Icon name="chevron" size={15} className="object-contain "></Icon>
              </button>
              {DropdownDireitoEstaAberto && (
                <div className="absolute top-full mt-1 w-full border border-gray-200 rounded shadow-lg bg-white z-10">
                  {moedas.map((moeda) => (
                    <button
                      key={moeda}
                      onClick={() => handleMoedaSelecionadaDireita(moeda)}
                      className="flex block w-full p-1 text-left hover:bg-gray-100 gap-1"
                    >
                      <Icon name={moeda}></Icon>
                      {moeda}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center w-[400px]">
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange} 
              id="amountInput"
              className="border border-black shadow-lg rounded p-1 min-w-[100px] w-auto"
            />
            <Icon name="rightArrow" />
            {loading ? <span>Carregando...</span> : <span className="border border-black rounded shadow-lg p-1 w-full min-w-[100px] w-auto h-full">{exchangeRate}</span>}
          </div>
        </section>
      </main>
    </div>
  );
}

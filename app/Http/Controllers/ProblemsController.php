<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProblemsRequest;
use App\Http\Requests\UpdateProblemsRequest;
use App\Models\Problems;

class ProblemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProblemsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProblemsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Problems  $problems
     * @return \Illuminate\Http\Response
     */
    public function show(Problems $problems)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Problems  $problems
     * @return \Illuminate\Http\Response
     */
    public function edit(Problems $problems)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProblemsRequest  $request
     * @param  \App\Models\Problems  $problems
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProblemsRequest $request, Problems $problems)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Problems  $problems
     * @return \Illuminate\Http\Response
     */
    public function destroy(Problems $problems)
    {
        //
    }
}
